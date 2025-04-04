import React from "react";
import ButtonLogout from "./ButtonLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/format/string";
import { useAuth } from "@/utils/context/AuthProvider";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <Avatar>
              <AvatarImage
                src={
                  user?.avatar
                    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user?.avatar}`
                    : "/images/avatar.png"
                }
              />
              <AvatarFallback>{getInitials(user?.name || "")}</AvatarFallback>
            </Avatar>
            <p className="font-medium hidden md:block">{user?.name}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <ButtonLogout />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
