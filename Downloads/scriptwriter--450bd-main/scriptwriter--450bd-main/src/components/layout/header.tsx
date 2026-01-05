import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MessageSquare, Share2, Film } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/features/theme-toggle';

export default function Header() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');
  const collaborator1 = PlaceHolderImages.find(img => img.id === 'user-avatar-2');
  const collaborator2 = PlaceHolderImages.find(img => img.id === 'user-avatar-3');

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Film className="size-5" />
        </div>
        <h1 className="text-xl font-bold hidden sm:inline-block">My First Script</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex -space-x-2">
          {collaborator1 && (
            <TooltipProviderWrapper tooltipText="Collaborator One">
              <Avatar className="border-2 border-background">
                <AvatarImage src={collaborator1.imageUrl} alt={collaborator1.description} data-ai-hint={collaborator1.imageHint} />
                <AvatarFallback>C1</AvatarFallback>
              </Avatar>
            </TooltipProviderWrapper>
          )}
          {collaborator2 && (
            <TooltipProviderWrapper tooltipText="Collaborator Two">
              <Avatar className="border-2 border-background">
                <AvatarImage src={collaborator2.imageUrl} alt={collaborator2.description} data-ai-hint={collaborator2.imageHint}/>
                <AvatarFallback>C2</AvatarFallback>
              </Avatar>
            </TooltipProviderWrapper>
          )}
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Comments</span>
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} data-ai-hint={userAvatar.imageHint}/>}
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SidebarTrigger />
      </div>
    </header>
  );
}

// Wrapper to avoid client-side only Tooltip components issues
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TooltipProviderWrapper = ({ children, tooltipText }: { children: React.ReactNode, tooltipText: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent><p>{tooltipText}</p></TooltipContent>
        </Tooltip>
    </TooltipProvider>
);
