"use client"
import Image from "next/image"
import Link from "next/link"
import {
  File,
  GlobeIcon,
  Home,
  LineChart,
  ListFilter,
  LocateIcon,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { wrap } from "@motionone/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { Separator } from "@/components/ui/separator"

export function RotateText() {
  const words = ["University", "Management"];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={words[index]}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]"
      >
        {words[index]}
      </motion.h1>
    </AnimatePresence>
  );
}

export function Cards() {
  return (
    <Card className="w-full max-w-[600px] relative overflow-hidden lg:w-[800px] min-w-1/2">
      <img
        alt="University Image"
        className="w-full h-[300px] object-cover"
        height="300"
        src="/doraemon.png"
        style={{
          aspectRatio: "600/300",
          objectFit: "cover",
        }}
        width="600"
      />
      <div className="absolute bottom-4 left-4">
        <img
          alt="University Logo"
          className="w-12 h-12 rounded-full"
          height={50}
          src="/✶┆.jpg"
          style={{
            aspectRatio: "50/50",
            objectFit: "cover",
          }}
          width={50}
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold">University of Vercel</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-3">
            <LocateIcon className="h-4 w-4" />
            <span>New York, USA</span>
            <Separator className="h-4" orientation="vertical" />
            <GlobeIcon className="h-4 w-4" />
            <span>International</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          The University of Vercel is a leading institution of higher education, known for its innovative curriculum,
          world-class faculty, and vibrant campus life. With campuses in New York and San Francisco, the university
          offers a diverse range of undergraduate and graduate programs, preparing students to become leaders in their
          fields.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4">
        <Button variant="outline">Update</Button>
        <Button variant="outline">Delete</Button>
        <Button>View</Button>
      </CardFooter>
    </Card>
  )
}
export function Component() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">

        <RotateText />
        <Button size="sm">Add New University</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Cards />
        <Cards />
        <Cards />
      </div>
    </main>
  )
}

export default function Universities() {
  return (
    // <div className="flex min-h-screen w-full flex-col bg-muted/40">
    //   <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    //     <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    //       <Tabs defaultValue="all">
    //         <div className="flex items-center">
    //           <TabsList>
    //             <TabsTrigger value="all">All</TabsTrigger>
    //             <TabsTrigger value="active">Active</TabsTrigger>
    //             <TabsTrigger value="draft">Draft</TabsTrigger>
    //             <TabsTrigger value="archived" className="hidden sm:flex">
    //               Archived
    //             </TabsTrigger>
    //           </TabsList>
    //           <div className="ml-auto flex items-center gap-2">
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button variant="outline" size="sm" className="h-8 gap-1">
    //                   <ListFilter className="h-3.5 w-3.5" />
    //                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
    //                     Filter
    //                   </span>
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent align="end">
    //                 <DropdownMenuLabel>Filter by</DropdownMenuLabel>
    //                 <DropdownMenuSeparator />
    //                 <DropdownMenuCheckboxItem checked>
    //                   Active
    //                 </DropdownMenuCheckboxItem>
    //                 <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
    //                 <DropdownMenuCheckboxItem>
    //                   Archived
    //                 </DropdownMenuCheckboxItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //             <Button size="sm" variant="outline" className="h-8 gap-1">
    //               <File className="h-3.5 w-3.5" />
    //               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
    //                 Export
    //               </span>
    //             </Button>
    //             <Button size="sm" className="h-8 gap-1">
    //               <PlusCircle className="h-3.5 w-3.5" />
    //               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
    //                 Add Product
    //               </span>
    //             </Button>
    //           </div>
    //         </div>
    //         <TabsContent value="all">
    //           <Card x-chunk="dashboard-06-chunk-0">
    //             <CardHeader>
    //               <CardTitle>Products</CardTitle>
    //               <CardDescription>
    //                 Manage your products and view their sales performance.
    //               </CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //               <Table>
    //                 <TableHeader>
    //                   <TableRow>
    //                     <TableHead className="hidden w-[100px] sm:table-cell">
    //                       <span className="sr-only">Image</span>
    //                     </TableHead>
    //                     <TableHead>Name</TableHead>
    //                     <TableHead>Status</TableHead>
    //                     <TableHead className="hidden md:table-cell">
    //                       Price
    //                     </TableHead>
    //                     <TableHead className="hidden md:table-cell">
    //                       Total Sales
    //                     </TableHead>
    //                     <TableHead className="hidden md:table-cell">
    //                       Created at
    //                     </TableHead>
    //                     <TableHead>
    //                       <span className="sr-only">Actions</span>
    //                     </TableHead>
    //                   </TableRow>
    //                 </TableHeader>
    //                 <TableBody>
    //                   <TableRow>
    //                     <TableCell className="hidden sm:table-cell">
    //                       <Image
    //                         alt="Product image"
    //                         className="aspect-square rounded-md object-cover"
    //                         height="64"
    //                         src="/hudi-man.png"
    //                         width="64"
    //                       />
    //                     </TableCell>
    //                     <TableCell className="font-medium">
    //                       Laser Lemonade Machine
    //                     </TableCell>
    //                     <TableCell>
    //                       <Badge variant="outline">Draft</Badge>
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       $499.99
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       25
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       2023-07-12 10:42 AM
    //                     </TableCell>
    //                     <TableCell>
    //                       <DropdownMenu>
    //                         <DropdownMenuTrigger asChild>
    //                           <Button
    //                             aria-haspopup="true"
    //                             size="icon"
    //                             variant="ghost"
    //                           >
    //                             <MoreHorizontal className="h-4 w-4" />
    //                             <span className="sr-only">Toggle menu</span>
    //                           </Button>
    //                         </DropdownMenuTrigger>
    //                         <DropdownMenuContent align="end">
    //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                           <DropdownMenuItem>Edit</DropdownMenuItem>
    //                           <DropdownMenuItem>Delete</DropdownMenuItem>
    //                         </DropdownMenuContent>
    //                       </DropdownMenu>
    //                     </TableCell>
    //                   </TableRow>
    //                   <TableRow>
    //                     <TableCell className="hidden sm:table-cell">
    //                       <Image
    //                         alt="Product image"
    //                         className="aspect-square rounded-md object-cover"
    //                         height="64"
    //                         src="/tanjiru.png"
    //                         width="64"
    //                       />
    //                     </TableCell>
    //                     <TableCell className="font-medium">
    //                       Hypernova Headphones
    //                     </TableCell>
    //                     <TableCell>
    //                       <Badge variant="outline">Active</Badge>
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       $129.99
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       100
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       2023-10-18 03:21 PM
    //                     </TableCell>
    //                     <TableCell>
    //                       <DropdownMenu>
    //                         <DropdownMenuTrigger asChild>
    //                           <Button
    //                             aria-haspopup="true"
    //                             size="icon"
    //                             variant="ghost"
    //                           >
    //                             <MoreHorizontal className="h-4 w-4" />
    //                             <span className="sr-only">Toggle menu</span>
    //                           </Button>
    //                         </DropdownMenuTrigger>
    //                         <DropdownMenuContent align="end">
    //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                           <DropdownMenuItem>Edit</DropdownMenuItem>
    //                           <DropdownMenuItem>Delete</DropdownMenuItem>
    //                         </DropdownMenuContent>
    //                       </DropdownMenu>
    //                     </TableCell>
    //                   </TableRow>
    //                   <TableRow>
    //                     <TableCell className="hidden sm:table-cell">
    //                       <Image
    //                         alt="Product image"
    //                         className="aspect-square rounded-md object-cover"
    //                         height="64"
    //                         src="/꒰𝙰𝚒 𝙰𝚛𝚝꒱ Wallpaper.jpg"
    //                         width="64"
    //                       />
    //                     </TableCell>
    //                     <TableCell className="font-medium">
    //                       AeroGlow Desk Lamp
    //                     </TableCell>
    //                     <TableCell>
    //                       <Badge variant="outline">Active</Badge>
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       $39.99
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       50
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       2023-11-29 08:15 AM
    //                     </TableCell>
    //                     <TableCell>
    //                       <DropdownMenu>
    //                         <DropdownMenuTrigger asChild>
    //                           <Button
    //                             aria-haspopup="true"
    //                             size="icon"
    //                             variant="ghost"
    //                           >
    //                             <MoreHorizontal className="h-4 w-4" />
    //                             <span className="sr-only">Toggle menu</span>
    //                           </Button>
    //                         </DropdownMenuTrigger>
    //                         <DropdownMenuContent align="end">
    //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                           <DropdownMenuItem>Edit</DropdownMenuItem>
    //                           <DropdownMenuItem>Delete</DropdownMenuItem>
    //                         </DropdownMenuContent>
    //                       </DropdownMenu>
    //                     </TableCell>
    //                   </TableRow>
    //                   <TableRow>
    //                     <TableCell className="hidden sm:table-cell">
    //                       <Image
    //                         alt="Product image"
    //                         className="aspect-square rounded-md object-cover"
    //                         height="64"
    //                         src="/✶┆.jpg"
    //                         width="64"
    //                       />
    //                     </TableCell>
    //                     <TableCell className="font-medium">
    //                       TechTonic Energy Drink
    //                     </TableCell>
    //                     <TableCell>
    //                       <Badge variant="secondary">Draft</Badge>
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       $2.99
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       0
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       2023-12-25 11:59 PM
    //                     </TableCell>
    //                     <TableCell>
    //                       <DropdownMenu>
    //                         <DropdownMenuTrigger asChild>
    //                           <Button
    //                             aria-haspopup="true"
    //                             size="icon"
    //                             variant="ghost"
    //                           >
    //                             <MoreHorizontal className="h-4 w-4" />
    //                             <span className="sr-only">Toggle menu</span>
    //                           </Button>
    //                         </DropdownMenuTrigger>
    //                         <DropdownMenuContent align="end">
    //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                           <DropdownMenuItem>Edit</DropdownMenuItem>
    //                           <DropdownMenuItem>Delete</DropdownMenuItem>
    //                         </DropdownMenuContent>
    //                       </DropdownMenu>
    //                     </TableCell>
    //                   </TableRow>
    //                   <TableRow>
    //                     <TableCell className="hidden sm:table-cell">
    //                       <Image
    //                         alt="Product image"
    //                         className="aspect-square rounded-md object-cover"
    //                         height="64"
    //                         src="/sticker-smash (3).jpeg"
    //                         width="64"
    //                       />
    //                     </TableCell>
    //                     <TableCell className="font-medium">
    //                       Gamer Gear Pro Controller
    //                     </TableCell>
    //                     <TableCell>
    //                       <Badge variant="outline">Active</Badge>
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       $59.99
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       75
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       2024-01-01 12:00 AM
    //                     </TableCell>
    //                     <TableCell>
    //                       <DropdownMenu>
    //                         <DropdownMenuTrigger asChild>
    //                           <Button
    //                             aria-haspopup="true"
    //                             size="icon"
    //                             variant="ghost"
    //                           >
    //                             <MoreHorizontal className="h-4 w-4" />
    //                             <span className="sr-only">Toggle menu</span>
    //                           </Button>
    //                         </DropdownMenuTrigger>
    //                         <DropdownMenuContent align="end">
    //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                           <DropdownMenuItem>Edit</DropdownMenuItem>
    //                           <DropdownMenuItem>Delete</DropdownMenuItem>
    //                         </DropdownMenuContent>
    //                       </DropdownMenu>
    //                     </TableCell>
    //                   </TableRow>
    //                   <TableRow>
    //                     <TableCell className="hidden sm:table-cell">
    //                       <Image
    //                         alt="Product image"
    //                         className="aspect-square rounded-md object-cover"
    //                         height="64"
    //                         src="/sukuna-fire-slash.jpg"
    //                         width="64"
    //                       />
    //                     </TableCell>
    //                     <TableCell className="font-medium">
    //                       Luminous VR Headset
    //                     </TableCell>
    //                     <TableCell>
    //                       <Badge variant="outline">Active</Badge>
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       $199.99
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       30
    //                     </TableCell>
    //                     <TableCell className="hidden md:table-cell">
    //                       2024-02-14 02:14 PM
    //                     </TableCell>
    //                     <TableCell>
    //                       <DropdownMenu>
    //                         <DropdownMenuTrigger asChild>
    //                           <Button
    //                             aria-haspopup="true"
    //                             size="icon"
    //                             variant="ghost"
    //                           >
    //                             <MoreHorizontal className="h-4 w-4" />
    //                             <span className="sr-only">Toggle menu</span>
    //                           </Button>
    //                         </DropdownMenuTrigger>
    //                         <DropdownMenuContent align="end">
    //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                           <DropdownMenuItem>Edit</DropdownMenuItem>
    //                           <DropdownMenuItem>Delete</DropdownMenuItem>
    //                         </DropdownMenuContent>
    //                       </DropdownMenu>
    //                     </TableCell>
    //                   </TableRow>
    //                 </TableBody>
    //               </Table>
    //             </CardContent>
    //             <CardFooter>
    //               <div className="text-xs text-muted-foreground">
    //                 Showing <strong>1-10</strong> of <strong>32</strong>{" "}
    //                 products
    //               </div>
    //             </CardFooter>
    //           </Card>
    //         </TabsContent>
    //       </Tabs>
    //     </main>
    //   </div>
    // </div>
    <>
      {/* Universities */}
      <Component />
    </>
  )
}
