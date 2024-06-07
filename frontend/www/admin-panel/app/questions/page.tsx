"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
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
import { Code } from "@/components/code";
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


function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

const Question = () => {



  const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
  const [resultsTag, setResultslTag] = React.useState<any[]>([]);
  const [answersTag, setAnswersTag] = React.useState<any[]>([]);

  const [docs, setDocs] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
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
    // setSheetToggle(!sheetToggle)
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
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const phoneData = getPhoneData(phone);
  function showPhoneNumberDetails() {
    setPhoneNumberDetails(!phoneNumberDetails);
  }

  const [inputedRuralQuota1, setInputedRuralQuota1] = React.useState("");
  const [inputedRuralQuota2, setInputedRuralQuota2] = React.useState("");
  const [inputedRuralQuota3, setInputedRuralQuota3] = React.useState("");
  const [inputedLevel, setInputedLevel] = React.useState("");
  const [inputedOrphanQuota2, setInputedOrphanQuota2] = React.useState("");
  const [inputedDisabilitiesQuota2, setInputedDisabilitiesQuota2] = React.useState("");
  const [inputedOrphanQuota3, setInputedOrphanQuota3] = React.useState("");
  const [inputedGeneralCompetition1, setInputedGeneralCompetition1] = React.useState("");
  const [inputedLargeFamiliesQuota2, setInputedLargeFamiliesQuota2] = React.useState("");
  const [inputedGeneralCompetition2, setInputedGeneralCompetition2] = React.useState("");
  const [inputedGeneralCompetition3, setInputedGeneralCompetition3] = React.useState("");
  const [inputedSpecialtyCode, setInputedSpecialtyCode] = React.useState("");
  const [inputedDisabilitiesQuota1, setInputedDisabilitiesQuota1] = React.useState("");
  const [inputedAverageSalary, setInputedAverageSalary] = React.useState("");
  const [inputedSubjects, setInputedSubjects] = React.useState("");
  const [inputedLargeFamiliesQuota1, setInputedLargeFamiliesQuota1] = React.useState("");
  const [inputedThreshold, setInputedThreshold] = React.useState("");
  const [inputedSpecialtyName, setInputedSpecialtyName] = React.useState("");
  const [inputedDisabilitiesQuota3, setInputedDisabilitiesQuota3] = React.useState("97");
  const [inputedOrphanQuota1, setInputedOrphanQuota1] = React.useState("");
  const [inputedUniversities, setInputedUniversities] = React.useState("");
  const [inputedLargeFamiliesQuota3, setInputedLargeFamiliesQuota3] = React.useState("");
  const [inputedAvailableGrantCount, setInputedAvailableGrantCount] = React.useState("");
  const [inputedDemandForSpecialty, setInputedDemandForSpecialty] = React.useState("");


  const handleRuralQuota1Change = (event: any) => {
    setInputedRuralQuota1(event.target.value);
  }

  const handleRuralQuota2Change = (event: any) => {
    setInputedRuralQuota2(event.target.value);
  }

  const handleRuralQuota3Change = (event: any) => {
    setInputedRuralQuota3(event.target.value);
  }

  const handleLevelChange = (event: any) => {
    setInputedLevel(event.target.value);
  }

  const handleOrphanQuota2Change = (event: any) => {
    setInputedOrphanQuota2(event.target.value);
  }

  const handleDisabilitiesQuota2Change = (event: any) => {
    setInputedDisabilitiesQuota2(event.target.value);
  }

  const handleOrphanQuota3Change = (event: any) => {
    setInputedOrphanQuota3(event.target.value);
  }

  const handleGeneralCompetition1Change = (event: any) => {
    setInputedGeneralCompetition1(event.target.value);
  }

  const handleLargeFamiliesQuota2Change = (event: any) => {
    setInputedLargeFamiliesQuota2(event.target.value);
  }

  const handleGeneralCompetition2Change = (event: any) => {
    setInputedGeneralCompetition2(event.target.value);
  }

  const handleGeneralCompetition3Change = (event: any) => {
    setInputedGeneralCompetition3(event.target.value);
  }

  const handleSpecialtyCodeChange = (event: any) => {
    setInputedSpecialtyCode(event.target.value);
  }

  const handleDisabilitiesQuota1Change = (event: any) => {
    setInputedDisabilitiesQuota1(event.target.value);
  }

  const handleAverageSalaryChange = (event: any) => {
    setInputedAverageSalary(event.target.value);
  }

  const handleSubjectsChange = (event: any) => {
    setInputedSubjects(event.target.value);
  }

  const handleLargeFamiliesQuota1Change = (event: any) => {
    setInputedLargeFamiliesQuota1(event.target.value);
  }

  const handleThresholdChange = (event: any) => {
    setInputedThreshold(event.target.value);
  }

  const handleSpecialtyNameChange = (event: any) => {
    setInputedSpecialtyName(event.target.value);
  }

  const handleDisabilitiesQuota3Change = (event: any) => {
    setInputedDisabilitiesQuota3(event.target.value);
  }

  const handleOrphanQuota1Change = (event: any) => {
    setInputedOrphanQuota1(event.target.value);
  }

  const handleUniversitiesChange = (event: any) => {
    setInputedUniversities(event.target.value);
  }

  const handleLargeFamiliesQuota3Change = (event: any) => {
    setInputedLargeFamiliesQuota3(event.target.value);
  }

  const handleAvailableGrantCountChange = (event: any) => {
    setInputedAvailableGrantCount(event.target.value);
  }

  const handleDemandForSpecialtyChange = (event: any) => {
    setInputedDemandForSpecialty(event.target.value);
  }


  // const handleNameChange = (event: any) => {
  //     setInputedName(event.target.value);
  // }
  // const handleEmailChange = (event: any) => {
  //     setInputedEmail(event.target.value);
  // }
  // const handleStatusChange = (event: any) => {
  //     setInputedStatus(event);
  // }
  // const handleFacebookChange = (event: any) => {
  //     setInputedFacebook(event.target.value);
  // }
  // const handleInstagramChange = (event: any) => {
  //     setInputedInstragam(event.target.value);
  // }
  // const handleCostChange = (event: any) => {
  //     setInputedCost(event.target.value);
  // }
  // const handleWebsiteChange = (event: any) => {
  //     setInputedWebsite(event.target.value);
  // }
  // const handleCodeChange = (event: any) => {
  //     setInputedCode(event.target.value);
  // }
  // const handleHostelChange = (event: any) => {
  //     setInputedHostel(event);
  // }
  // const handleMilitaryChange = (event: any) => {
  //     setInputedMilitary(event);
  // }
  // const handleDescriptionChange = (event: any) => {
  //     setInputedDescription(JSON.stringify(event));
  // }
  // const syncImagesAndLogo = () => {
  //     const newArray2: any = uploadedImages.map((file) => file.url);
  //     setInputedImages(newArray2);
  //     uploadedLogo.map((file: any) => {
  //         setInputedLogo(file.url);
  //         return null;
  //     })
  //     setCreateButtonDisabled(!createButtonDisabled);
  // }
  // const handleInputedValues = () => {
  //     setInputedValues(!inputedValues);
  // }



  const [loadingMore, setLoadingMore] = React.useState(false)
  const [inputedName, setInputedName] = React.useState("")
  const [inputedEmail, setInputedEmail] = React.useState("")
  const [inputedStatus, setInputedStatus] = React.useState("")
  const [inputedFacebook, setInputedFacebook] = React.useState("")
  const [inputedInstragam, setInputedInstragam] = React.useState("")
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
  const handleInstagramChange = (event: any) => {
    setInputedInstragam(event.target.value);
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
    setInputedDescription(JSON.stringify(event));
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
  const handleMainQuestion = (event: any) => {
    setInputedMainQuestion(event.target.value);
  }

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
      const q = query(collection(db, "questions"), limit(8));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
      // Configuring Data for Update:
      docs.map((item: any) => {
        setInputedMainQuestion(item.mainQuestion);
        setAnswersTag(item.answers);
        setResultslTag(item.results);
      })
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  const loadMore = async () => {
    setLoading(true);

    const q = query(
      collection(db, "questions"),
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
        <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Questions</span>
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
  const descriptionResult = (theObject: any) => {
    theObject.forEach((itemParent: any) => {
      itemParent.children.forEach((child: any) => {
        console.log(child.text);
      });
    });
  }

  return (

    <div>
      <main className="w-full py-5 px-[5%] h-auto pb-7 min-h-[90vh]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Questions</span>
          <Link href="/create-question">
            <Button size="sm">Add New Question</Button>
          </Link>
        </div>
        <div className="admin-panel-lists">
          {docs.map((items) => (
            <div key={items.id}>

              <Card className="hover-glow-border w-full relative bg-primary-foreground">
                <CardHeader>
                  <CardTitle>{items.mainQuestion}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">

                    {
                      items.answers.length > 0 ? (<div className="space-y-3">
                        {
                          items.answers.map((index: any) => {
                            return (
                              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {index}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="ghost">
                                    <CheckIcon className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>) : (<div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No Answers are provided.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <CheckIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>)
                    }
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-start items-start gap-2">


                  {/* {
                    items.results.length > 0 ? (<div className="flex items-center gap-2 w-full">
                      {
                        items.results.map((index: any) => {
                          return (
                            <Badge key={index} variant="outline" className="text-xs text-center">{index}</Badge>
                          )
                        })
                      }
                    </div>) : (<div className="flex items-center gap-2 w-full">
                      <Badge variant="outline">Nothing</Badge>
                    </div>)
                  } */}

                  <div className="flex gap-2 w-full justify-between mt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View</Button>
                      </DialogTrigger>
                      <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
                        <div className="w-full flex flex-col gap-2 border rounded-lg p-3 text-sm overflow-hidden">
                          <div className="flex gap-2 p-3">
                            <p>MainQuestion: </p>
                            <span className="font-semibold">{items.mainQuestion || "No Main Questing is Provided."}</span>
                          </div>
                          <Separator />
                          <div className="flex gap-2 p-3">
                            <p>Answers: </p>
                            <span className="font-semibold w-full overflow-y-hidden overflow-x-auto  truncate">
                              {items.answers.length > 0 ? items.answers.flatMap((item: any) => <Badge
                                key={item}
                                className={cn(
                                  "w-fit text-center mx-1.5",
                                  "bg-green-500 text-green-50"
                                )}
                              >
                                {item}
                              </Badge>) : "No Answers is provided"
                              }
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2 p-3">
                            <p>Results: </p>
                            <span className="font-semibold w-full overflow-y-hidden overflow-x-auto truncate">
                              {items.results.length > 0 ? items.results.flatMap((item:any) => <Badge
                                key={item}
                                className={cn(
                                  "w-fit text-center mx-1.5",
                                  "bg-green-500 text-green-50"
                                )}
                              >
                                {item}
                              </Badge>) : "No Results is provided"
                              }
                            </span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button onClick={handleConfetti} variant="default">Update</Button>
                        </SheetTrigger>
                        <SheetContent side={"bottom"} className="h-[90vh] !max-w-[1600px] mx-auto rounded-xl">
                          <ScrollArea className="h-full w-full rounded-md border">
                            <div className="create-university min-h-[100vh] lg:flex lg:flex-col space-y-3 p-10 pt-3 !min-w-full lg:!min-w-[1500px]">
                              <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                                <div className="w-full h-full flex items-start justify-start space-x-3">
                                  <Link href="/questions" className="z-50">
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
                                    // disabled={createButtonDisabled}
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


                                      const updateRef = doc(db, "questions", items.id);
                                      const Update: any = await updateDoc(updateRef, {
                                        mainQuestion: inputedMainQuestion || items.mainQuestion,
                                        answers: answersTag.length > 0 ? answersTag.map(obj => obj.text) : items.answers,
                                        results: resultsTag.length > 0 ? resultsTag.map(obj => obj.text) : items.results
                                      })





                                      toast({
                                        title: 'University has been Updated Successfully.',
                                        description: (
                                          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                            <span>You Can now view and delete this questions!</span>
                                            <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                              {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                            </pre>
                                          </div>
                                        ),
                                      });

                                      location.reload();

                                      // setSheetToggle(!sheetToggle)
                                      // router.push('/specialities')
                                      // setSheetToggle(true)

                                      // console.log("Document written with ID: ", Update.id);
                                      // const newDocs = docs.filter((item) => item.id !== items.id);
                                      // setDocs(newDocs);
                                      // fetchDocs()
                                    }}
                                  >
                                    {/* {
                                                                    createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                } */}
                                    Update
                                  </Button>
                                </div>
                              </div>



                              {inputedValues && <div className="min-w-full w-max flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3">
                                <div className="flex gap-2 p-3">
                                  <p>MainQestion: </p>
                                  <span className="font-semibold">{inputedMainQuestion || "No MainQestion is Provided."}</span>
                                </div>
                                <Separator />
                                <div className="flex gap-2 p-3">
                            <p>Answers: </p>
                            <span className="font-semibold w-full overflow-y-hidden overflow-x-auto  truncate">
                              {answersTag.length > 0 ? answersTag.flatMap((item: any) => <Badge
                                key={item}
                                className={cn(
                                  "w-fit text-center mx-1.5",
                                  "bg-green-500 text-green-50"
                                )}
                              >
                                {item.text}
                              </Badge>) : "No Answers is provided"
                              }
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2 p-3">
                            <p>Results: </p>
                            <span className="font-semibold w-full overflow-y-hidden overflow-x-auto  truncate">
                              {resultsTag.length > 0 ? resultsTag.flatMap((item:any) => <Badge
                                key={item}
                                className={cn(
                                  "w-fit text-center mx-1.5",
                                  "bg-green-500 text-green-50"
                                )}
                              >
                                {item.text}
                              </Badge>) : "No Results is provided"
                              }
                            </span>
                          </div>
                                {/* <div className="flex gap-2 p-3">
                                  <p>Answers: </p>
                                  <span className="font-semibold">{JSON.stringify(answersTag, null, 2) || "No Answers is Provided."}</span>
                                </div>
                                <Separator />
                                <div className="flex gap-2 p-3">
                                  <p>Results: </p>
                                  <span className="font-semibold">{JSON.stringify(resultsTag, null, 2) || "No Results is Provided."}</span>
                                </div> */}
                              </div>}

                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                <h1 className="text-4xl font-bold w-full text-left">Answers</h1>
                                <TagInput
                                  placeholder="Enter Your Results"
                                  tags={answersTag}
                                  className="sm:min-w-[450px]"
                                  setTags={(newTags) => {
                                    setAnswersTag(newTags);
                                  }}
                                />
                              </div>
                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                <h1 className="text-4xl font-bold w-full text-left">Results</h1>
                                <TagInput
                                  placeholder="Enter Your Results"
                                  tags={resultsTag}
                                  className="sm:min-w-[450px]"
                                  setTags={(newTags) => {
                                    setResultslTag(newTags);
                                  }}
                                />
                              </div>
                              <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                                <h1 className="text-4xl font-bold w-full text-left">MainQuestion</h1>
                                <Input onChange={handleMainQuestion} type="text" placeholder="Enter MainQuestion" />
                              </div>



                              <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                                <Link href="/questions" className="z-50 w-full">
                                  <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto">
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
                                  // disabled={createButtonDisabled}
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
                                    const updateRef = doc(db, "questions", items.id);
                                    const Update: any = await updateDoc(updateRef, {
                                      mainQuestion: inputedMainQuestion || items.mainQuestion,
                                      answers: answersTag.length > 0 ? answersTag.map(obj => obj.text) : items.answers,
                                      results: resultsTag.length > 0 ? resultsTag.map(obj => obj.text) : items.results
                                    })


                                    toast({
                                      title: 'University has been Updated Successfully.',
                                      description: (
                                        <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                          <span>You Can now view and delete this question!</span>
                                          <pre className="max-h-[500px] overflow-x-auto overflow-y-auto bg-background">
                                            {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                          </pre>
                                        </div>
                                      ),
                                    });
                                    location.reload();

                                    // router.push('/specialities')
                                    // setSheetToggle(true)

                                    // setSheetToggle(!sheetToggle)
                                    // router.push('/university')
                                    // fetchDocs()
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
                        await deleteDoc(doc(db, "questions", items.id));
                        const newDocs = docs.filter((item) => item.id !== items.id);
                        setDocs(newDocs);
                      }} className="bg-red-500 text-white hover:bg-red-600" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              {/* {Object.keys(items).map((key) => (
              <li key={key}>
                <strong>{key}:</strong> {items[key]}
              </li>
            ))} */}

            </div>
          ))}
        </div>

        <Button variant={'outline'} className="w-full mt-7" onClick={loadMore} disabled={loading}>
          {
            loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          }
          Load More
        </Button>
      </main>

    </div>

  );
};
export default Question;













