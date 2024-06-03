"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
import { Chrome, CircleDollarSign, Code, Earth, Facebook, Flame, Hotel, Instagram, Mail, MapPinned, MessageCircleDashed, Phone, PocketKnife, University } from "lucide-react"

const firebaseConfig = {
  apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
  authDomain: "ustudy-96678.firebaseapp.com",
  projectId: "ustudy-96678",
  storageBucket: "ustudy-96678.appspot.com",
  messagingSenderId: "581632635532",
  appId: "1:581632635532:web:51ccda7d7adce6689a81a9"
};
// Iniialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db: any = getFirestore(app);
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
import { Skeleton } from "@/components/ui/skeleton"
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
import React, { ReactNode, useState } from "react";
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
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ImageIcon } from "@radix-ui/react-icons"
import { Button as AnimatedButton } from "@/components/button"
import { Textarea } from "@/components/ui/textarea"

import CountryDropdown from "@/components/dropdown/countries";
import StateDropdown from "@/components/dropdown/states";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from "@/registry/default//ui/toast"
import { useToast } from "@/registry/default/ui/use-toast"
import { Tag, TagInput } from 'emblor';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// import { CommentsPopover } from '@/components/plate-ui/comments-popover';
// import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
// import { Editor } from '@/components/plate-ui/editor';
// import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
// import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
// import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
// import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
// import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { ArrowRightIcon, ArrowLeftIcon, ChevronsUpDown, Plus, X, Projector, CloudUpload, Loader2 } from "lucide-react"
// import { Code } from "@/components/code";
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import { Badge } from "@/components/ui/badge";
import { useDropdownStore } from "@/lib/store/dropdown";
import { useUploadFile as useUploadImages } from "@/hooks/use-upload-file"
import { useUploadFile as useUploadLogo } from "@/hooks/use-upload-logo"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/registry/default/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button as NextuiButton } from "@nextui-org/react";
import { cva, type VariantProps } from "class-variance-authority"
import { FileUploader } from "@/components/file-uploader"
import type { UploadedFile } from "@/types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/empty-card"
import { useUniversityImages } from "@/lib/store/university-images"
import { Label } from "@/components/ui/label"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'



const UniversityPage = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true })
  // )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const { uploadImages, imagesUploadingProgress, uploadedImages, isImagesUploading } = useUploadImages(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )
  const { uploadLogo, logoUploadprogresses, isLogoUploading, uploadedLogo } = useUploadLogo(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )
  const { toast } = useToast();
  const router = useRouter()
  const { countryValue, stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } = useDropdownStore();
  const { images } = useUniversityImages();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement;
    const boundingBox = buttonRef.current?.getBoundingClientRect?.();
    const targetY = boundingBox?.y ?? 0;
    const targetX = boundingBox?.x ?? 0;
    const targetWidth = boundingBox?.width ?? 0;
    const targetCenterX = targetX + targetWidth / 2;
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    });
    setSheetToggle(!sheetToggle);
  };



  const [inputedValues, setInputedValues] = React.useState(false);
  const [sheetToggle, setSheetToggle] = React.useState(false);
  const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false)
  const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
  const containerRef = useRef(null);
  const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];
  const [phone, setPhone] = React.useState("+1 (408) 996–1010");
  const handleOnChange = (e: any) => {
    setPhone(e.target.value);
  };
  const phoneData = getPhoneData(phone);
  function showPhoneNumberDetails() {
    setPhoneNumberDetails(!phoneNumberDetails);
  }
  const [inputedName, setInputedName] = React.useState("")
  const [inputedEmail, setInputedEmail] = React.useState("")
  const [inputedStatus, setInputedStatus] = React.useState("")
  const [inputedFacebook, setInputedFacebook] = React.useState("")
  const [inputedInstagam, setInputedInstagam] = React.useState("")
  const [inputedCost, setInputedCost] = React.useState("")
  const [inputedWebsite, setInputedWebsite] = React.useState("")
  const [inputedCode, setInputedCode] = React.useState("")
  const [inputedHostel, setInputedHostel] = React.useState("")
  const [inputedMilitary, setInputedMilitary] = React.useState("")
  const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
  const [inputedLogo, setInputedLogo] = React.useState("")
  const [inputedAddress, setInputedAddress] = React.useState(stateValue)
  const [inputedRegion, setInputedRegion] = React.useState(countryValue)
  const [inputedDescription, setInputedDescription] = React.useState("")
  const [inputedImages, setInputedImages] = React.useState([])
  const [inputedImage, setInputedImage] = React.useState("")

  const handleNameChange = (event: any) => {
    setInputedName(event.target.value);
  }
  const handleEmailChange = (event: any) => {
    setInputedEmail(event.target.value);
  }
  const handleStatusChange = (event: any) => {
    setInputedStatus(event);
  }
  const handleFacebookChange = (event: any) => {
    setInputedFacebook(event.target.value);
  }


  const handleImageChange = (event: any) => {
    setInputedImage(event.target.value);
  }
  const handleLogoChange = (event: any) => {
    setInputedLogo(event.target.value);
  }

  const handleInstagramChange = (event: any) => {
    setInputedInstagam(event.target.value);
  }
  const handleCostChange = (event: any) => {
    setInputedCost(event.target.value);
  }
  const handleWebsiteChange = (event: any) => {
    setInputedWebsite(event.target.value);
  }
  const handleCodeChange = (event: any) => {
    setInputedCode(event.target.value);
  }
  const handleHostelChange = (event: any) => {
    setInputedHostel(event);
  }
  const handleMilitaryChange = (event: any) => {
    setInputedMilitary(event);
  }
  const handleDescriptionChange = (event: any) => {
    setInputedDescription(event.target.value);
  }
  const syncImagesAndLogo = () => {
    const newArray2: any = uploadedImages.map((file) => file.url);
    setInputedImages(newArray2);
    uploadedLogo.map((file: any) => {
      setInputedLogo(file.url);
      return null;
    })
    setCreateButtonDisabled(!createButtonDisabled);
  }
  const handleInputedValues = () => {
    setInputedValues(!inputedValues);
  }

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  // This page
  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      const q = query(collection(db, "universities"), limit(8));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
      // Configuring Data for Update:
      docs.map((item: any) => {
        setInputedAddress(item.address);
        setInputedCost(item.educationCost);
        setInputedEmail(item.email);
        setInputedFacebook(item.facebook);
        setInputedHostel(item.hostel);
        setInputedImages(item.images);
        setInputedImage(item.image);
        setInputedInstagam(item.instagram);
        setInputedMilitary(item.military);
        setInputedPhoneNumber(item.phoneNumber);
        setInputedRegion(item.region);
        setInputedStatus(item.status);
        setInputedCode(item.universityCode);
        setInputedDescription(item.universityDescription);
        setInputedName(item.universityName);
        setInputedWebsite(item.website);
        setInputedLogo(item.logo);
      })
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const q = query(
      collection(db, "universities"),
      startAfter(lastDoc),
      limit(8)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      toast({
        title: 'There is no more data in the database.',
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
            <span>Please add more data to load more!</span>
          </div>
        ),
      });
      setLoading(false);
      return;
    }
    const newDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDocs([...docs, ...newDocs]);
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  if (loading) {
    return <main className="w-full py-5 px-[5%] h-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Universities</span>
      </div>
      <div className="admin-panel-lists-loading place-content-center">
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 rounded-xl border min-h-max p-5 w-full max-w-[90%]">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-full" />
          </div>
        </div>



      </div>
    </main>;
  }

  return (
    <main className="w-full py-5 px-[5%] h-auto mb-10">
      <div className="flex items-center justify-between mb-6">
        <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Universities</span>
        <Link href="/create-university">
          <Button size="sm">Add New University</Button>
        </Link>
      </div>
      <div className="admin-panel-lists place-content-center">
        {docs.map((items: any) => (
          <div key={items.id}>
            <Card className="hover-glow-border w-full relative hover:bg-primary-foreground h-full flex flex-col">
              <div className="w-full flex flex-col items-center justify-center relative min-h-auto">
                <Carousel
                  plugins={[plugin.current]}
                  setApi={setApi}
                  className="w-full !min-h-min"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>

                    {items.images && items.images.length > 0 ? items.images.map((index: any) => (

                      <CarouselItem key={index} className="h-[250px] border-b">
                        <div className="h-full">
                          <Card>
                            <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                              <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                <Image
                                  src={index || "/placeholder.svg"}
                                  alt="Images"
                                  fill
                                  sizes="(min-width: 250px) 300px, 100vw"
                                  loading="lazy"
                                  className="rounded-md object-cover"
                                />
                              </AspectRatio>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>



                    )) : items.image ? Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index} className="h-[250px] border-b">
                        <div className="h-full">
                          <Card>
                            <CardContent className="flex items-center justify-center h-full w-full text-center !p-0">
                              <AspectRatio ratio={16 / 9} className="h-[300px] ">
                                <Image
                                  src={items.image || "/placeholder.svg"}
                                  alt="Image"
                                  fill
                                  sizes="(min-width: 250px) 300px, 100vw"
                                  loading="lazy"
                                  className="rounded-md object-cover"
                                />
                              </AspectRatio>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    )) : ""}
                  </CarouselContent>
                </Carousel>
              </div>
              {items.images && items.images.length > 0 ? "" : items.image ? "" : <div className="center rounded-md border h-[250px]">No image is provided.</div>}
              {/* <div className="absolute bottom-4 left-4">
                <Avatar>
                  <AvatarImage src={items.logo} alt="@Ustudy" />
                  <AvatarFallback>UY</AvatarFallback>
                </Avatar>
              </div> */}
              <CardContent className="px-6 space-y-4 h-[200px] py-5 overflow-x-hidden overflow-y-auto">
                <div>
                  <h2 className="text-2xl font-bold w-full truncate">{items.universityName || "No Name Provided for this university."}</h2>
                  <div className="flex items-center space-x-2 text-sm text-primary mt-3">
                    <LocateIcon className="h-4 w-4" />
                    <span>{items.address || "Nothing."}</span>
                    <Separator className="h-4" orientation="vertical" />
                    <GlobeIcon className="h-4 w-4" />
                    <span>{items.region || "Nothing."}</span>
                  </div>
                </div>
                {typeof items.universityDescription === "object" ? JSON.parse(items.universityDescription).map((item: any) => (
                  <div key={item.id}>
                    {item.children.map((child: any) => (
                      <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground" key={child.text}>{child.text}</p>
                    ))}
                  </div>
                )) : <p className="text-overflow-clamp text-sm leading-relaxed text-muted-foreground">{items.universityDescription || "No Description Provided for this university."}</p>}
              </CardContent>
              <CardFooter className="flex !w-full items-center justify-between">

                <div className="">
                  <Avatar>
                    <AvatarImage src={items.logo} alt="@Ustudy" />
                    <AvatarFallback>UY</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex justify-end gap-1.5">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent className="lg:min-w-[650px]">
                      <ScrollArea className="w-full rounded-md border !max-h-[70vh] !p-0">
                        {/* <div className="w-full flex flex-col gap-2 rounded-lg p-3 text-sm">
                          <div className="flex gap-2">
                            <p>Name: </p>
                            <span className="font-semibold w-auto text-start">{items.universityName || "No Name is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Email: </p>
                            <span className="font-semibold w-auto text-start">{items.email || "No Email is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Facebook: </p>
                            <span className="font-semibold w-auto text-start">{items.facebook || "No Facebook Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Instagram: </p>
                            <span className="font-semibold w-auto text-start">{items.instragam || "No Instagram Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Education Cost: </p>
                            <span className="font-semibold w-auto text-start">{items.educationCost || "No Education Cost is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Website: </p>
                            <span className="font-semibold w-auto text-start">{items.website || "No Website Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>University Code: </p>
                            <span className="font-semibold w-auto text-start">{items.universityCode || "No University Code is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Phone Number: </p>
                            <span className="font-semibold w-auto text-start">{items.phoneNumber || "No Phone Number is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Logo: </p>
                            <span className="font-semibold w-auto text-start">{items.logo || "No Logo is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Address: </p>
                            <span className="font-semibold w-auto text-start">{items.address || "No Address is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Region: </p>
                            <span className="font-semibold w-auto text-start">{items.region || "No Region is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Description: </p>
                            <span className="font-semibold w-auto text-start">{items.universityDescription || "No Description is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Image: </p>
                            <span className="font-semibold w-auto text-start">{items.image || "No Image is Provided."}</span>
                          </div>
                          <Separator />

                          <div className="flex gap-2">
                            <p>Hostel: </p>
                            <Badge
                              className={cn(
                                "w-fit text-center",
                                items.hostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                              )}
                            >
                              {items.hostel || "No Hostel Information Provided."}
                            </Badge>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Military: </p>
                            <Badge
                              className={cn(
                                "w-fit",
                                items.military ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                              )}
                            >
                              {items.military || 'No Military Status Provided.'}
                            </Badge>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            <p>Status: </p>
                            <Badge
                              className={cn(
                                "w-fit",
                                items.status ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                              )}
                            >
                              {items.status || "No Status Provided."}
                            </Badge>
                          </div>
                        </div> */}
                        <div className="flex w-full flex-col gap-2 rounded-lg p-3 text-sm">
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <University className="h-5 w-5 !p-0" />
                            </div>
                            <p className="flex flex-row text-center">University: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.universityName || "No Name is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Mail className="h-5 w-5 !p-0" />
                            </div>
                            <p>Email: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.email || "No Email is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Facebook className="h-5 w-5 !p-0" />
                            </div>
                            <p>Facebook: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.facebook || "No Facebook Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Instagram className="h-5 w-5 !p-0" />
                            </div>
                            <p>Instagram: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.instagram || "No Instagram Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <CircleDollarSign className="h-5 w-5 !p-0" />
                            </div>
                            <p>Education Cost: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.educationCost || "No Education Cost is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Chrome className="h-5 w-5 !p-0" />
                            </div>
                            <p>Website: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.website || "No Website Link is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Code className="h-5 w-5 !p-0" />
                            </div>
                            <p>University Code: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.universityCode || "No University Code is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Code className="h-5 w-5 !p-0" />
                            </div>
                            <p>University Image: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.image || "No University Code is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Code className="h-5 w-5 !p-0" />
                            </div>
                            <p>University Logo: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.logo || "No University Code is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Phone className="h-5 w-5 !p-0" />
                            </div>
                            <p>Phone Number: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.phoneNumber || "No Phone Number is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Earth className="h-5 w-5 !p-0" />
                            </div>
                            <p>Address: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.address || "No Address is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <MapPinned className="h-5 w-5 !p-0" />
                            </div>
                            <p>Region: </p>
                            <span className="w-auto select-all text-start font-semibold">{items.region || "No Region is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2 py-3">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <MessageCircleDashed className="h-5 w-5 !p-0" />
                            </div>
                            <span className="max-w-[90%] select-all text-start font-semibold">Description: {items.universityDescription || "No Description is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Hotel className="h-5 w-5 !p-0" />
                            </div>
                            <p>Hostel: </p>
                            <Badge
                              className={cn(
                                "w-fit text-center",
                                items.hostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                              )}
                            >
                              {items.hostel || "No Hostel Information Provided."}
                            </Badge>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <PocketKnife className="h-5 w-5 !p-0" />
                            </div>
                            <p>Military: </p>
                            <Badge
                              className={cn(
                                "w-fit",
                                items.military ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                              )}
                            >
                              {items.military || 'No Military Status Provided.'}
                            </Badge>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-start gap-2">
                            <div className="bg-primary-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full p-1 pb-2">
                              <Flame className="h-5 w-5 !p-0" />
                            </div>
                            <p>Status: </p>
                            <Badge
                              className={cn(
                                "w-fit",
                                items.status ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                              )}
                            >
                              {items.status || "No Status Provided."}
                            </Badge>
                          </div>
                        </div>
                      </ ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button onClick={handleConfetti} variant="default">Update</Button>
                    </SheetTrigger>
                    <SheetContent side={"bottom"} className="h-[90vh] !max-w-[1600px] mx-auto rounded-xl">
                      <ScrollArea className="h-full w-full rounded-md border">
                        <div className="create-university min-h-[100vh] lg:flex lg:flex-col space-y-3 p-10 pt-3 !min-w-full lg:!min-w-[1500px]">
                          <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                            <div className="w-full h-full flex items-start justify-start space-x-3">
                              <Link href="/universities" className="z-50">
                                <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                  Back
                                </AnimatedButton>
                              </Link>
                              <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                {inputedValues ? "Hide" : "Show"} Inputed Values
                              </AnimatedButton>
                            </div>

                            <div className="w-full h-full flex items-end justify-end space-x-3">
                              {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                Sync Uploaded Files
                              </AnimatedButton> */}
                              <Button
                                className="!py-0"
                                onClick={async () => {
                                  const { clientWidth, clientHeight } = document.documentElement;
                                  const boundingBox = buttonRef.current?.getBoundingClientRect?.();
                                  const targetY = boundingBox?.y ?? 0;
                                  const targetX = boundingBox?.x ?? 0;
                                  const targetWidth = boundingBox?.width ?? 0;
                                  const targetCenterX = targetX + targetWidth / 2;
                                  const confetti = (await import("canvas-confetti")).default;
                                  confetti({
                                    zIndex: 999,
                                    particleCount: 100,
                                    spread: 70,
                                    origin: {
                                      y: targetY / clientHeight,
                                      x: targetCenterX / clientWidth,
                                    },
                                  });


                                  const updateRef = doc(db, "universities", items.id);
                                  const Update = await updateDoc(updateRef, {
                                    address: stateValue || items.address,
                                    educationCost: inputedCost || items.educationCost,
                                    email: inputedEmail || items.email,
                                    facebook: inputedFacebook || items.facebook,
                                    hostel: inputedHostel || items.hostel,
                                    image: inputedImage || items.image,
                                    instagram: inputedInstagam || items.instagram,
                                    military: inputedMilitary || items.military,
                                    phoneNumber: phone || items.phoneNumber,
                                    region: countryValue || items.region,
                                    status: inputedStatus || items.status,
                                    universityCode: inputedCode || items.universityCode,
                                    universityDescription: inputedDescription || items.universityDescription,
                                    universityName: inputedName || items.universityName,
                                    website: inputedWebsite || items.website,
                                    logo: inputedLogo || items.logo
                                  })

                                  // items.logo ? await updateDoc(updateRef, {
                                  //   address: stateValue || items.address,
                                  //   educationCost: inputedCost || items.educationCost,
                                  //   email: inputedEmail || items.email,
                                  //   facebook: inputedFacebook || items.facebook,
                                  //   hostel: inputedHostel || items.hostel,
                                  //   image: inputedImage || items.image,
                                  //   images: inputedImages || items.images,
                                  //   instagram: inputedInstagam || items.instagram,
                                  //   military: inputedMilitary || items.military,
                                  //   phoneNumber: inputedPhoneNumber || items.phoneNumber,
                                  //   region: countryValue || items.region,
                                  //   status: inputedStatus || items.status,
                                  //   universityCode: inputedCode || items.universityCode,
                                  //   universityDescription: inputedDescription || items.universityDescription,
                                  //   universityName: inputedName || items.universityName,
                                  //   website: inputedWebsite || items.website,
                                  //   logo: inputedLogo || items.logo
                                  // }) : await updateDoc(updateRef, {
                                  //   address: stateValue || items.address,
                                  //   educationCost: inputedCost || items.educationCost,
                                  //   email: inputedEmail || items.email,
                                  //   facebook: inputedFacebook || items.facebook,
                                  //   hostel: inputedHostel || items.hostel,
                                  //   image: inputedImage || items.image,
                                  //   images: inputedImages || items.images,
                                  //   instagram: inputedInstagam || items.instagram,
                                  //   military: inputedMilitary || items.military,
                                  //   phoneNumber: inputedPhoneNumber || items.phoneNumber,
                                  //   region: countryValue || items.region,
                                  //   status: inputedStatus || items.status,
                                  //   universityCode: inputedCode || items.universityCode,
                                  //   universityDescription: inputedDescription || items.universityDescription,
                                  //   universityName: inputedName || items.universityName,
                                  //   website: inputedWebsite || items.website,
                                  // });

                                  toast({
                                    title: 'University has been Updated Successfully.',
                                    description: (
                                      <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                        <span>You Can now view and delete this university!</span>
                                        <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                        </pre>
                                      </div>
                                    ),
                                  });

                                  location.reload();
                                }}
                              >
                                {/* {
                                  createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                } */}
                                Update
                              </Button>
                            </div>
                          </div>
                          {inputedValues && <div className="w-full flex flex-col gap-2 rounded-lg p-3 text-sm overflow-hidden border">
                            <div className="flex gap-2">
                              <p>Name: </p>
                              <span className="font-semibold w-auto text-start">{inputedName || "No Name is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Email: </p>
                              <span className="font-semibold w-auto text-start">{inputedEmail || "No Email is Provided."}</span>
                            </div>

                            <Separator />
                            <div className="flex gap-2">
                              <p>Facebook: </p>
                              <span className="font-semibold w-auto text-start">{inputedFacebook || "No Facebook Link is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Instagram: </p>
                              <span className="font-semibold w-auto text-start">{inputedInstagam || "No Instagram Link is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Education Cost: </p>
                              <span className="font-semibold w-auto text-start">{inputedCost || "No Education Cost is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Website: </p>
                              <span className="font-semibold w-auto text-start">{inputedWebsite || "No Website Link is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>University Code: </p>
                              <span className="font-semibold w-auto text-start">{inputedCode || "No University Code is Provided."}</span>
                            </div>
                            <Separator />


                            <div className="flex gap-2">
                              <p>Phone Number: </p>
                              <span className="font-semibold w-auto text-start">{phone || "No Phone Number is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Logo: </p>
                              <span className="font-semibold w-auto text-start">{inputedLogo || "No Logo is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Address: </p>
                              <span className="font-semibold w-auto text-start">{stateValue || "No Address is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Region: </p>
                              <span className="font-semibold w-auto text-start">{countryValue || "No Region is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Description: </p>
                              <span className="font-semibold w-auto text-start">{inputedDescription || "No Description is Provided."}</span>
                            </div>
                            <Separator />
                            {/* <div className="flex gap-2">
                              <p>Images: </p>
                              <span className="font-semibold w-auto text-start">{JSON.stringify(inputedImages, null, 2) || "No Images are Provided."}</span>
                            </div>
                            <Separator /> */}
                            <div className="flex gap-2">
                              <p>Image: </p>
                              <span className="font-semibold w-auto text-start">{inputedImage || "No Image is Provided."}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Hostel: </p>
                              {
                                <Badge
                                  className={cn(
                                    "w-fit text-center",
                                    inputedHostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                  )}
                                >
                                  {inputedHostel || "No Hostel Information Provided."}
                                </Badge>
                              }
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Military: </p>
                              {
                                <Badge
                                  className={cn(
                                    "w-fit",
                                    inputedMilitary ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                  )}
                                >
                                  {inputedMilitary || 'No Military Status Provided.'}
                                </Badge>
                              }
                            </div>

                            <Separator />
                            <div className="flex gap-2">
                              <p>Status: </p>
                              {
                                <Badge
                                  className={cn(
                                    "w-fit",
                                    inputedStatus ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                  )}
                                >
                                  {inputedStatus || "No Status Provided."}
                                </Badge>
                              }
                            </div>
                          </div>}
                          <div className="name-logo-description-university w-full grid gap-3 ">
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Name</h1>
                              <Input onChange={handleNameChange} type="text" placeholder="Enter University Name" />
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Email</h1>
                              <Input onChange={handleEmailChange} type="email" placeholder="Enter University Email" />
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Status</h1>
                              <Select onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>What is the operating method of this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="Non Profit">Non Profit</SelectItem>
                                    <SelectItem value="Public">Public</SelectItem>
                                    <SelectItem value="Liberal">Liberal</SelectItem>
                                    <SelectItem value="Community">Community</SelectItem>
                                    <SelectItem value="Corporatized">Corporatized</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="tag-location-university w-full grid gap-3 h-auto">

                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left mb-3">Phone Number</h1>
                              <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                              <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                            </div>
                            {/* <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
                              <div className="leftLogo flex flex-col items-start justify-center lg:h-full h-auto space-y-3 w-1/2">
                                <h1 className="text-4xl font-bold w-auto text-left">Logo</h1>
                                <div className="flex w-auto items-start justify-start">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline">Upload Logo</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[95%] sm:mx-auto lg:min-w-[750px] lg:max-w-[35%]">
                                      <FileUploader
                                        maxFiles={1}
                                        maxSize={4 * 1024 * 1024}
                                        progresses={logoUploadprogresses}
                                        onUpload={uploadLogo}
                                        disabled={isLogoUploading}
                                      />
                                      <Card className="hover-glow-border">
                                        <CardHeader>
                                          <CardTitle>Uploaded Logo</CardTitle>
                                          <CardDescription>View the uploaded logo here</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                          {uploadedLogo.length > 0 ? (
                                            <ScrollArea className="pb-4">
                                              <div className="flex w-max space-x-2.5">
                                                {
                                                  uploadedLogo.map((file: any) => {
                                                    return (
                                                      <div key={file.key} className="relative aspect-video w-64">
                                                        <Image
                                                          src={file.url}
                                                          alt={file.name}
                                                          fill
                                                          sizes="(min-width: 640px) 640px, 100vw"
                                                          loading="lazy"
                                                          className="rounded-md object-cover"
                                                        />
                                                        <span>{file.name}</span>
                                                      </div>
                                                    )
                                                  })
                                                }
                                              </div>
                                              <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                          ) : (
                                            <EmptyCard
                                              title="No Logo uploaded"
                                              description="Upload logo to see it here"
                                              className="w-full"
                                            />
                                          )}
                                        </CardContent>
                                      </Card>
                                    </DialogContent>
                                  </Dialog>
                                </div>

                              </div>

                              <div className="flex items-center justify-end lg:h-full h-auto RightLogoSide w-1/2">
                                {uploadedLogo.length > 0 ? (
                                  <div className="flex w-full h-full">
                                    {
                                      uploadedLogo.map((file: any) => {
                                        return (
                                          <div key={file.key} className="relative aspect-video w-full h-full overflow-hidden">
                                            <Image
                                              src={file.url}
                                              alt={file.name}
                                              fill
                                              sizes="(min-width: 100%) 100%, 50vw"
                                              loading="lazy"
                                              className="rounded-md object-cover"
                                            />
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                ) : (
                                  <Card
                                    className={cn(
                                      "flex w-full flex-col items-center justify-center space-y-3 bg-transparent p-3",
                                    )}
                                  >
                                    <div className="shrink-0 rounded-full border border-dashed p-4">
                                      <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                      <CardDescription>Uplaod Logo to see them here</CardDescription>
                                    </div>
                                  </Card>

                                )}
                              </div>
                            </div> */}
                            <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                              <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                                <CountryDropdown />
                                <StateDropdown />
                              </div>
                            </div>
                          </div>
                          {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                            <div className="flex gap-2">
                              <p>Phone number: </p>
                              <span className="font-semibold w-auto text-start">{phoneData.phoneNumber || "-"}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Country code: </p>
                              <span className="font-semibold w-auto text-start">{phoneData.countryCode || "-"}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>Country calling code: </p>
                              <span className="font-semibold w-auto text-start">
                                {phoneData.countryCallingCode || "-"}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>National number: </p>
                              <span className="font-semibold w-auto text-start">
                                {phoneData.nationalNumber || "-"}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>International number: </p>
                              <span className="font-semibold w-auto text-start">
                                {phoneData.internationalNumber || "-"}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p>URI: </p>
                              <span className="font-semibold w-auto text-start">{phoneData.uri || "-"}</span>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                              <p className="flex-shrink-0">Possible countries: </p>
                              <span className="font-semibold w-auto text-start">
                                {phoneData.possibleCountries || "-"}
                              </span>
                            </div>
                            <Separator />
                            <Badge
                              className={cn(
                                "w-fit",
                                phoneData.isValid
                                  ? "bg-green-500 text-green-50"
                                  : "bg-destructive text-destructive-foreground",
                              )}
                            >
                              VALID NUMBER
                            </Badge>
                            <Separator />
                            <Badge
                              className={cn(
                                "w-fit",
                                phoneData.isPossible
                                  ? "bg-green-500 text-green-50"
                                  : "bg-destructive text-destructive-foreground",
                              )}
                            >
                              POSSIBLE NUMBER
                            </Badge>
                          </div>}
                          <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                            <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                            {/* <div className="w-full h-full border-t">
                            <DndProvider backend={HTML5Backend}>
                              <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                                <Plate plugins={plugins} initialValue={initialValue} onChange={handleDescriptionChange}>
                                  <div
                                    ref={containerRef}
                                    className={cn(
                                      'relative',
                                      '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                                    )}
                                  >
                                    <FixedToolbar>
                                      <FixedToolbarButtons />
                                    </FixedToolbar>

                                    <Editor
                                      className="p-3 px-7 !min-h-[500px]"
                                      autoFocus
                                      focusRing={false}
                                      variant="ghost"
                                      size="md"

                                    />

                                    <MentionCombobox items={MENTIONABLES} />

                                    <CommentsPopover />

                                    <CursorOverlay containerRef={containerRef} />
                                  </div>
                                </Plate>
                              </CommentsProvider>
                            </DndProvider>
                          </div> */}
                            <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." />
                          </div>
                          {/* <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
                            <div className="w-full h-full flex flex-col space-y-4">
                              <h1 className="text-4xl font-bold w-full text-left pl-4">Images</h1>
                              <div className="space-y-6">
                                <FileUploader
                                  maxFiles={10}
                                  maxSize={4 * 1024 * 1024}
                                  progresses={imagesUploadingProgress}
                                  onUpload={uploadImages}
                                  disabled={isImagesUploading}
                                />
                                <Card className="hover-glow-border">
                                  <CardHeader>
                                    <CardTitle>Uploaded images</CardTitle>
                                    <CardDescription>View the uploaded images here</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    {uploadedImages.length > 0 ? (
                                      <ScrollArea className="pb-4">
                                        <div className="flex w-max space-x-2.5">
                                          {
                                            uploadedImages.map((file: any) => {
                                              return (
                                                <div key={file.key} className="relative aspect-video w-64">
                                                  <Image
                                                    src={file.url}
                                                    alt={file.name}
                                                    fill
                                                    sizes="(min-width: 640px) 640px, 100vw"
                                                    loading="lazy"
                                                    className="rounded-md object-cover"
                                                  />
                                                  <span>{file.name}</span>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                      </ScrollArea>
                                    ) : (<ScrollArea className="pb-4">
                                      <div className="flex w-max space-x-2.5">
                                        <EmptyCard
                                          title="No images uploaded"
                                          description="Upload some images to see them here"
                                          className="w-full"
                                        />
                                      </div>
                                      <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </div> */}
                          <div className="name-logo-description-university w-full grid gap-3 ">

                            {/* <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Image</h1>
                            <Input onChange={handleImageChange} type="text" placeholder="Enter University Image" />
                          </div> */}
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                              <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                              <Select onValueChange={handleHostelChange}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Hostel Availability" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                              <Select onValueChange={handleMilitaryChange}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Military Campain" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                    <Separator className="mb-1" />

                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="name-logo-description-university w-full grid gap-3 ">
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                              <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                              <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                              <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                            </div>
                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                              <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                            </div>
                          </div>

                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Logo</h1>
                            <Input onChange={handleLogoChange} type="text" placeholder="Enter Logo Link" />
                          </div>
                          <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Image</h1>
                            <Input onChange={handleImageChange} type="text" placeholder="Enter Image Link" />
                          </div>

                          {/* <Collapsible
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className="w-full space-y-2"
                          >
                            <div className="flex items-center justify-between space-x-4 px-4">
                              <h4 className="text-sm font-semibold w-auto text-start">
                                Add Files Link
                              </h4>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                  <ChevronsUpDown className="h-4 w-4" />
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>

                            <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                              <h1 className="text-4xl font-bold w-full text-left">Logo</h1>
                              <Input onChange={handleLogoChange} type="text" placeholder="Enter Logo Link" />
                            </div>

                            <CollapsibleContent className="space-y-2">
                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Images</h1>
                    <TagInput
                        placeholder="Enter Images Link"
                        tags={inputedImages}
                        draggable
                        className="sm:min-w-[450px]"
                        setTags={(newTags:any) => {
                            setInputedImages(newTags);
                        }}
                    />
                </div>

                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                <h1 className="text-4xl font-bold w-full text-left">Images</h1>
                                <Input onChange={handleImageChange} type="text" placeholder="Enter Images Link" />
                              </div>









                            </CollapsibleContent>
                          </Collapsible> */}


                          <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                            <Link href="/universities" className="z-50 w-full">
                              <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto pr-3 text-start">
                                Back
                              </AnimatedButton>
                            </Link>
                            <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                              {inputedValues ? "Hide" : "Show"} Inputed Values
                            </AnimatedButton>
                            {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                              Sync Uploaded Files
                            </AnimatedButton> */}
                            <AnimatedButton
                              className="!py-0 w-full"
                              onClick={async () => {
                                const { clientWidth, clientHeight } = document.documentElement;
                                const boundingBox = buttonRef.current?.getBoundingClientRect?.();
                                const targetY = boundingBox?.y ?? 0;
                                const targetX = boundingBox?.x ?? 0;
                                const targetWidth = boundingBox?.width ?? 0;
                                const targetCenterX = targetX + targetWidth / 2;
                                const confetti = (await import("canvas-confetti")).default;
                                confetti({
                                  zIndex: 999,
                                  particleCount: 100,
                                  spread: 70,
                                  origin: {
                                    y: targetY / clientHeight,
                                    x: targetCenterX / clientWidth,
                                  },
                                });


                                const updateRef = doc(db, "universities", items.id);
                                const Update = await updateDoc(updateRef, {
                                  address: stateValue || items.address,
                                  educationCost: inputedCost || items.educationCost,
                                  email: inputedEmail || items.email,
                                  facebook: inputedFacebook || items.facebook,
                                  hostel: inputedHostel || items.hostel,
                                  image: inputedImage || items.image,
                                  instagram: inputedInstagam || items.instagram,
                                  military: inputedMilitary || items.military,
                                  phoneNumber: phone || items.phoneNumber,
                                  region: countryValue || items.region,
                                  status: inputedStatus || items.status,
                                  universityCode: inputedCode || items.universityCode,
                                  universityDescription: inputedDescription || items.universityDescription,
                                  universityName: inputedName || items.universityName,
                                  website: inputedWebsite || items.website,
                                  logo: inputedLogo || items.logo
                                })

                                // items.logo ? await updateDoc(updateRef, {
                                //   address: stateValue || items.address,
                                //   educationCost: inputedCost || items.educationCost,
                                //   email: inputedEmail || items.email,
                                //   facebook: inputedFacebook || items.facebook,
                                //   hostel: inputedHostel || items.hostel,
                                //   image: inputedImage || items.image,
                                //   images: inputedImages || items.images,
                                //   instagram: inputedInstagam || items.instagram,
                                //   military: inputedMilitary || items.military,
                                //   phoneNumber: inputedPhoneNumber || items.phoneNumber,
                                //   region: countryValue || items.region,
                                //   status: inputedStatus || items.status,
                                //   universityCode: inputedCode || items.universityCode,
                                //   universityDescription: inputedDescription || items.universityDescription,
                                //   universityName: inputedName || items.universityName,
                                //   website: inputedWebsite || items.website,
                                //   logo: inputedLogo || items.logo
                                // }) : await updateDoc(updateRef, {
                                //   address: stateValue || items.address,
                                //   educationCost: inputedCost || items.educationCost,
                                //   email: inputedEmail || items.email,
                                //   facebook: inputedFacebook || items.facebook,
                                //   hostel: inputedHostel || items.hostel,
                                //   image: inputedImage || items.image,
                                //   images: inputedImages || items.images,
                                //   instagram: inputedInstagam || items.instagram,
                                //   military: inputedMilitary || items.military,
                                //   phoneNumber: inputedPhoneNumber || items.phoneNumber,
                                //   region: countryValue || items.region,
                                //   status: inputedStatus || items.status,
                                //   universityCode: inputedCode || items.universityCode,
                                //   universityDescription: inputedDescription || items.universityDescription,
                                //   universityName: inputedName || items.universityName,
                                //   website: inputedWebsite || items.website,
                                // });

                                toast({
                                  title: 'University has been Updated Successfully.',
                                  description: (
                                    <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                      <span>You Can now view and delete this university!</span>
                                      <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                        {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                      </pre>
                                    </div>
                                  ),
                                });

                                location.reload();
                              }}
                            >
                              {/* {
                                createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              } */}
                              Update
                            </AnimatedButton>

                          </div>

                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>

                  <Button onClick={async () => {
                    await deleteDoc(doc(db, "universities", items.id));
                    const newDocs = docs.filter((item) => item.id !== items.id);
                    setDocs(newDocs);
                  }} className="bg-red-500 text-white hover:bg-red-600" variant="destructive">
                    Delete
                  </Button>
                </div>


              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <Button variant={'outline'} className="w-full mt-5" onClick={loadMore} disabled={loading}>
        Load More
      </Button>
    </main>
  );
};
export default UniversityPage;























































