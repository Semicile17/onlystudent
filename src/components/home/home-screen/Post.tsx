/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  ImageIcon,
  LockKeyholeIcon,
  MessageCircle,
  Trash,
} from "lucide-react";
import Comment from "./Comments";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {  Prisma, User } from "@prisma/client";
import { CldVideoPlayer } from "next-cloudinary";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  commentOnPostAction,
  deletePostAction,
  likePostAction,
} from "./actions";
import { useToast } from "@/hooks/use-toast";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: true;
      };
    };
    likesList: true;
  };
}>;

const Post = ({
  post,
  isSubscribed,
  admin,
}: {
  post: PostWithComments;
  isSubscribed: boolean;
  admin: User;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { mutate: deletePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => await deletePostAction(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const { mutate: likePost } = useMutation({
    mutationKey: ["likePost"],
    mutationFn: async () => {
      post.likes += isLiked ? -1 : 1;
      setIsLiked(!isLiked);
      await likePostAction(post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationKey: ["commentPost"],
    mutationFn: async () => await commentOnPostAction(post.id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setComment("");
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCommentSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!comment) return;
    commentPost();
  };

  useEffect(() => {
    if (post.likesList && user?.id) setIsLiked(post.likesList.length > 0);
  }, [post.likesList, user?.id]);

  return (
    <div className="flex flex-col gap-3 p-3 border-t">
      <div className="flex items-center justify-between ">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={admin.image || "/user-placeholder.png"}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold text-sm md:text-md">
                {admin.name}
              </span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">
              17.06.2024
            </p>
            {admin.id === user?.id && (
              <Trash
                className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer"
                onClick={() => deletePost()}
              />
            )}
          </div>
        </div>
      </div>
      <p className="text-sm md:text-md">{post.text}</p>
      {(post.isPublic || isSubscribed) &&
        post.mediaUrl &&
        post.mediaType === "image" && (
          <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
            <Image
              src={post.mediaUrl}
              alt="Post Image"
              className="rounded-lg object-contain"
              fill
            />
          </div>
        )}
      {(post.isPublic || isSubscribed) &&
        post.mediaUrl &&
        post.mediaType === "video" && (
          <div className="w-full mx-auto">
            <CldVideoPlayer
              width="960"
              height="540"
              className="rounded-md"
              src={post.mediaUrl}
            />
          </div>
        )}

      {!isSubscribed && !post.isPublic && (
        <div className="bg-slate-800 w-full relative h-96 rounded-md bg-of flex flex-col justify-center items-center px-5 overflow-hidden">
          <LockKeyholeIcon className="w-16 h-16 text-zinc-400 mb-20 z-0" />
          <div
            className="opacity-60 absolute top-0 left-0 w-full h-full bg-stone-800"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-2 z-10 border p-2 border-gray-500 w-full rounded">
            <div className="flex gap-1 item-center">
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs">1</span>
            </div>
            <Link
              href="/pricing"
              className={buttonVariants({
                className: "rounded-full w-full font-bold text-white",
              })}
            >
              subscribe to unlock
            </Link>
          </div>
        </div>
      )}
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <Heart
            className={cn("w-5 h-5 cursor-pointer", {
              "text-red-500": isLiked,
              "fill-red-500": isLiked,
            })}
            onClick={() => {
              if (!isSubscribed) return;
              likePost();
            }}
          />
          <span className="text-xs text-zinc-400 tracking-tighter">
            {post.likes}
          </span>
        </div>
        
        <div className="flex gap-1 items-center">
          <Dialog>
            <DialogTrigger>
              <MessageCircle className="w-5 h-5 cursor-pointer" />
         
            </DialogTrigger>
          
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Comments</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] w-full rounded-md p">
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}

                  {post.comments.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-zinc-400">No comments yet</p>
                    </div>
                  )}
                </ScrollArea>

                <form onSubmit={handleCommentSubmission}>
                  <Input
                    placeholder="Add a comment"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className=""
                  />

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="mt-4"
                      disabled={isCommenting}
                    >
                      {isCommenting ? "Commenting..." : "Comment"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
         
          </Dialog>

          <span className="text-xs text-zinc-400 tracking-tighter">
            {post.comments.length > 0 ? post.comments.length : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
