/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable @next/next/no-img-element */

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import type { NextPage } from "next"
import Link from "next/link"
import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import FrameComponent from "@/components/spcialty-products-page/frame-component"
import { useToast } from "@/registry/default/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Chrome, CircleDollarSign, Code, Earth, Facebook, Flame, Hotel, Instagram, Mail, MapPinned, MessageCircleDashed, Phone, PocketKnife, Sparkles, University } from "lucide-react"

const firebaseConfig = {
  apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
  authDomain: "ustudy-96678.firebaseapp.com",
  projectId: "ustudy-96678",
  storageBucket: "ustudy-96678.appspot.com",
  messagingSenderId: "581632635532",
  appId: "1:581632635532:web:51ccda7d7adce6689a81a9",
}
const app = initializeApp(firebaseConfig)
const db: any = getFirestore(app)

const fetchDocument = async (docId: string) => {
  const docRef = doc(db, "universities", docId)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

const Collages: any = ({ params }: { params: { slug: string } }) => {
  const [tabsValue, setTabsValue] = useState<any>("overview")
  const [specialties, setSpecialties] = useState<any>([])
  const [docs, setDocs] = useState<any>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true)
      const data = await fetchDocument(params.slug)
      setDocs(data)
      setLoading(false)
    }
    const fetchSpecilaties = async () => {
      const querySnapshot = await getDocs(collection(db, "specialties"))
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSpecialties(newDocs)
    }

    fetchSpecilaties()
    fetchDocs()
  }, [])

  const loadMore = async () => {
    setLoading(true)
    const q = query(
      collection(db, "universities"),
      startAfter(lastDoc),
      limit(8)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length === 0) {
      toast({
        title: "There is no more data in the database.",
        description: (
          <div className="bg-primary-foreground mt-2 w-[340px] rounded-md p-4">
            <span>Please add more data to load more!</span>
          </div>
        ),
      })
      setLoading(false)
      return
    }
    const newDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDocs([...docs, ...newDocs])
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setLoading(false)
  }

  if (loading) {
    return (
      <main className="h-auto w-full px-[5%] py-5">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
            Collages
          </span>
        </div>
        <div className="admin-panel-lists-loading place-content-center">
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      {docs ? (
        <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative box-border flex w-full flex-col items-start justify-start overflow-hidden bg-black px-0 pb-[404px] pt-0 text-center text-xl leading-[normal] tracking-[normal]">
          {docs.images && docs.images.length > 0 ? (
            docs.images.map((index: any) => (
              <div key={index} className="relative z-20 w-full">


                <div className="bg-primary-foreground absolute bottom-0 left-0 z-50 rounded-full border border-red-500 !p-10">
                  <Avatar className="z-40 !m-10 size-[200px] !border-none object-cover">
                    <AvatarImage src={docs.logo} alt="@Ustudy" />
                    <AvatarFallback>UY</AvatarFallback>
                  </Avatar>
                </div>

                <img
                  className="!m-0 h-[800px] !min-w-full rounded-[5px] object-cover"
                  alt="Images"
                  src={index}
                />
              </div>
            ))
          ) : docs.image ? (
            <div className="relative z-20 w-full">
              <div className="bg-background absolute -bottom-[125px] left-[10%] z-50 size-auto rounded-full border border-green-500">
                <Avatar className="z-40 !m-[50px] size-[150px] !border-none object-cover">
                  <AvatarImage src={docs.logo} alt="@Ustudy" />
                  <AvatarFallback>UY</AvatarFallback>
                </Avatar>
              </div>
              <img
                className="!m-0 h-[800px] w-full rounded-[5px] object-cover"
                alt="Image"
                src={docs.image}
              />
            </div>

          ) : (
            ""
          )}

          {docs.images && docs.images.length > 0 ? (
            ""
          ) : docs.image ? (
            ""
          ) : (
            <img
              className="!m-0 h-[800px] w-full rounded-[5px] object-cover"
              alt="No Image"
              src="/rectangle14230.png"
            />
          )}
          <div className="bg-blueviolet-100 z-[2] box-border hidden w-[274px] flex-row items-center justify-start whitespace-nowrap rounded-lg px-0 py-4">
            <b className="relative inline-block h-4 flex-1 leading-[16px]">
              Read uSTAKING white paper
            </b>
          </div>
          <main className="flex max-w-full flex-col items-start justify-start space-y-2 self-stretch lg:space-y-10">
            <span className="title text-37xl !mx-auto mt-32 w-[50%] truncate bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              {docs.universityName || "Astana IT University"}
            </span>

            <Tabs defaultValue={tabsValue} onValueChange={(e: string) => setTabsValue(e)} className="mx-auto !flex w-full !flex-row rounded-md p-5 lg:w-[1200px]">
              <TabsList className="!flex !min-h-[500px] !min-w-max !flex-col !items-start !justify-start gap-8 !rounded-none bg-black pr-4">
                <TabsTrigger className={cn("!relative space-x-3", tabsValue === "overview" ? "!bg-black" : "")} value="overview">
                  <div className="center relative h-[30px] w-auto">
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt="Circle"
                      src="/circle.png"
                    />
                    <div className="absolute left-0 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 bg-black" />
                  </div>
                  <span className={cn("text-muted-foreground relative text-[1.5rem] font-bold", tabsValue === "overview" && "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text  text-transparent")}>
                    Overview
                    {tabsValue === "overview" && <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />}
                  </span>
                </TabsTrigger>
                <TabsTrigger className={cn("!relative space-x-3", tabsValue === "contacts" ? "!bg-black" : "")} value="contacts">
                  <div className="center relative h-[30px] w-auto">
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt="Circle"
                      src="/circle.png"
                    />
                    <div className="absolute left-0 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 bg-black" />
                  </div>
                  <span className={cn("text-muted-foreground relative text-[1.5rem] font-bold", tabsValue === "contacts" && "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text  text-transparent")}>
                    Contacts
                    {tabsValue === "contacts" && <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />}
                  </span>
                  {/* <span className="relative bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-[1.5rem] font-bold text-transparent hover:underline">
                    Contacts
                    <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />
                  </span> */}
                </TabsTrigger>
                <TabsTrigger className={cn("!relative space-x-3", tabsValue === "majors" ? "!bg-black" : "")} value="majors">
                  <div className="center relative h-[30px] w-auto">
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt="Circle"
                      src="/circle.png"
                    />
                    <div className="absolute left-0 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 bg-black" />
                  </div>
                  <span className={cn("text-muted-foreground relative text-[1.5rem] font-bold", tabsValue === "majors" && "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text  text-transparent")}>
                    Majors
                    {tabsValue === "majors" && <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />}
                  </span>
                  {/* <span className="relative bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-[1.5rem] font-bold text-transparent hover:underline">
                    Majors
                    <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />
                  </span> */}
                </TabsTrigger>
                <TabsTrigger className={cn("!relative space-x-3", tabsValue === "academics" ? "!bg-black" : "")} value="academics">
                  <div className="center relative h-[30px] w-auto">
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt="Circle"
                      src="/circle.png"
                    />
                    <div className="absolute left-0 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 bg-black" />
                  </div>
                  <span className={cn("text-muted-foreground relative text-[1.5rem] font-bold", tabsValue === "academics" && "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text  text-transparent")}>
                    Academics
                    {tabsValue === "academics" && <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />}
                  </span>
                  {/* <span className="relative bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-[1.5rem] font-bold text-transparent hover:underline">
                    Academics
                    <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />
                  </span> */}
                </TabsTrigger>
                <TabsTrigger className={cn("!relative space-x-3", tabsValue === "reviews" ? "!bg-black" : "")} value="reviews">
                  <div className="center relative h-[30px] w-auto">
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt="Circle"
                      src="/circle.png"
                    />
                    <div className="absolute left-0 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 bg-black" />
                  </div>
                  <span className={cn("text-muted-foreground relative text-[1.5rem] font-bold", tabsValue === "reviews" && "bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text  text-transparent")}>
                    Reviews
                    {tabsValue === "reviews" && <div className="absolute -bottom-1 right-0 h-[3px] w-full bg-gradient-to-r  from-fuchsia-600 to-pink-600" />}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="*:text-start *:font-mono *:leading-relaxed *:tracking-wide">
                <div className="mb-16 flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-0.5 pr-1.5">
                  <div className="mq450:text-lg relative inline-block max-w-full flex-1">
                    <span className="text-13xl leading-none tracking-tight">Details</span>
                    <p className="m-0">
                      {docs.universityName} University,
                    </p>
                    <p className="m-0">
                      {/* which is an element of the general system of
                      management of educational process in the university
                      and implies maximum consideration of interests of
                      students. */}
                      is located in {docs.region} at {docs.address}.
                    </p>
                    {/* <p className="m-0">{`process at the university and assumes maximum consideration of interests,`}</p>
                    <p className="m-0">
                      needs of students on the basis of studying their
                      public opinion.
                    </p> */}
                  </div>
                </div>
                <div className="text-whitesmoke font-poppins text-13xl flex flex-col items-start justify-start gap-[7px] self-stretch">
                  <b className="mq1050:text-7xl mq450:text-lgi relative self-stretch">
                    Description
                  </b>
                  {/* <p className="w-fit text-green-400">{docs.universityName}</p> */}
                  <div className="font-dm-sans-desktop-24px-regular text-lightsteelblue mq450:text-lgi relative self-stretch text-5xl">
                    {/* <p className="m-0">
                      ({docs.universityName}) University has an active student
                      self-government,
                    </p>
                    <p className="m-0">
                      which is an element of the general system of
                      management of educational process in the university
                      and implies maximum consideration of interests of
                      students.
                    </p>
                    <p className="m-0">{`process at the university and assumes maximum consideration of interests,`}</p> */}
                    <p className="m-0">{docs.universityDescription}</p>
                  </div>
                </div>
                {/* <div className="font-dm-sans-desktop-24px-regular mq1050:gap-[31px] mq750:max-w-full mq450:gap-[15px] flex max-w-[calc(100%_-_182px)] flex-1 flex-col items-start justify-start gap-[62px]">
                    <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-0.5 pr-1.5">
                      <div className="mq450:text-lgi relative inline-block max-w-full flex-1">
                        <p className="m-0">
                          {docs.universityName} University has an active student
                          self-government,
                        </p>
                        <p className="m-0">
                          which is an element of the general system of
                          management of educational process in the university
                          and implies maximum consideration of interests of
                          students.
                        </p>
                        <p className="m-0">{`
                                                process at the university and assumes maximum consideration of interests,`}</p>
                        <p className="m-0">
                          needs of students on the basis of studying their
                          public opinion.
                        </p>
                      </div>
                    </div>
                    <div className="text-whitesmoke font-poppins text-13xl flex flex-col items-start justify-start gap-[7px] self-stretch">
                      <b className="mq1050:text-7xl mq450:text-lgi relative self-stretch">
                        Entire Ecosystem
                      </b>
                      <div className="font-dm-sans-desktop-24px-regular text-lightsteelblue mq450:text-lgi relative self-stretch text-5xl">
                        <p className="m-0">
                          {docs.universityName} University has an active student
                          self-government,
                        </p>
                        <p className="m-0">
                          which is an element of the general system of
                          management of educational process in the university
                          and implies maximum consideration of interests of
                          students.
                        </p>
                        <p className="m-0">{`process at the university and assumes maximum consideration of interests,`}</p>
                        <p className="m-0">
                          needs of students on the basis of studying their
                          public opinion.
                        </p>
                      </div>
                    </div>
                  </div> */}
              </TabsContent>
              <TabsContent value="contacts" className="w-full *:text-start *:font-mono *:leading-relaxed *:tracking-wide">
                <div className="flex w-full flex-col gap-2 rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Mail className="size-5 !p-0" />
                    </div>
                    <p>Email: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.email || "No Email is Provided."}</span>
                  </div>
                  <Separator />
                  <Link href={docs.facebook}>
                    <div className="flex items-center justify-start gap-2">
                      <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                        <Facebook className="size-5 !p-0" />
                      </div>
                      <p>Facebook: </p>
                      <span className="w-auto select-all text-start font-semibold">{docs.facebook || "No Facebook Link is Provided."}</span>
                      {/* <Facebook className="size-5 !self-end" /> */}

                    </div>
                  </Link>


                  <Separator />

                  <Link href={docs.instagram}>

                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Instagram className="size-5 !p-0" />
                    </div>
                    <p>Instagram: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.instagram || "No Instagram Link is Provided."}</span>
                  </div>
                  </Link>



                  <Separator />

                  <Link href={docs.website}>

                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Chrome className="size-5 !p-0" />
                    </div>
                    <p>Website: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.website || "No Website Link is Provided."}</span>
                  </div>
                  </Link>

                  <Separator />
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Phone className="size-5 !p-0" />
                    </div>
                    <p>Phone Number: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.phoneNumber || "No Phone Number is Provided."}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Earth className="size-5 !p-0" />
                    </div>
                    <p>Address: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.address || "No Address is Provided."}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <MapPinned className="size-5 !p-0" />
                    </div>
                    <p>Region: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.region || "No Region is Provided."}</span>
                  </div>

                </div>
              </TabsContent>
              <TabsContent value="majors" className="w-full *:text-start *:font-mono *:leading-relaxed *:tracking-wide">
                <div className="flex w-full flex-col gap-2 rounded-lg border p-3 px-5 text-sm">
                  {specialties.map((specialty: any, index: any) => {
                    // const matchedUniversities = specialty.universities.map((university: any) => university === docs.universityName);
                    const matchedUniversities = specialty.universities.some((text: string) => docs.universityName);
                    return matchedUniversities ? null : (
                      <div key={specialty.id} className="my-1">
                        <div className="flex items-center justify-start gap-3">
                          <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                            {/* {`${index + 1}`} */}
                            <Sparkles className="size-5 !p-0" />
                          </div>
                          <span className="w-auto select-all text-start font-semibold">{specialty.name || "No Specialty Name Provided."}</span>
                        </div>
                      </div>
                    );
                  }) || "No Majors are connected to this university this time!"}

                </div>




              </TabsContent>
              <TabsContent value="academics" className="w-full *:text-start *:font-mono *:leading-relaxed *:tracking-wide">
                <div className="flex w-full flex-col gap-2 rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <CircleDollarSign className="size-5 !p-0" />
                    </div>
                    <p>Education Cost: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.educationCost || "No Education Cost is Provided."}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Code className="size-5 !p-0" />
                    </div>
                    <p>University Code: </p>
                    <span className="w-auto select-all text-start font-semibold">{docs.universityCode || "No University Code is Provided."}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="w-full *:text-start *:font-mono *:leading-relaxed *:tracking-wide">
                <div className="flex w-full flex-col gap-2 rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Hotel className="size-5 !p-0" />
                    </div>
                    <p>Hostel: </p>
                    <Badge
                      className={cn(
                        "w-fit text-center",
                        docs.hostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {docs.hostel || "No Hostel Information Provided."}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <PocketKnife className="size-5 !p-0" />
                    </div>
                    <p>Military: </p>
                    <Badge
                      className={cn(
                        "w-fit",
                        docs.military ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {docs.military || 'No Military Status Provided.'}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-start gap-2">
                    <div className="bg-primary-foreground flex size-[45px] items-center justify-center rounded-full p-1 pb-2">
                      <Flame className="size-5 !p-0" />
                    </div>
                    <p>Status: </p>
                    <Badge
                      className={cn(
                        "w-fit",
                        docs.status ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                      )}
                    >
                      {docs.status || "No Status Provided."}
                    </Badge>
                  </div>
                </div>
                {/* There is no reviews currently availabel for this university. So, till then stay tuned! */}
              </TabsContent>
            </Tabs>


          </main>
          <div className="relative z-[4] hidden h-[512px] w-[41px] bg-black" />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Collages





{/*                   <div className="font-dm-sans-desktop-24px-regular mq1050:gap-[31px] mq750:max-w-full mq450:gap-[15px] flex max-w-[calc(100%_-_182px)] flex-1 flex-col items-start justify-start gap-[62px]">
                    <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-0.5 pr-1.5">
                      <div className="mq450:text-lgi relative inline-block max-w-full flex-1">
                        <p className="m-0">
                          {docs.universityName} University has an active student
                          self-government,
                        </p>
                        <p className="m-0">
                          which is an element of the general system of
                          management of educational process in the university
                          and implies maximum consideration of interests of
                          students.
                        </p>
                        <p className="m-0">{`
                                                process at the university and assumes maximum consideration of interests,`}</p>
                        <p className="m-0">
                          needs of students on the basis of studying their
                          public opinion.
                        </p>
                      </div>
                    </div>
                    <div className="text-whitesmoke font-poppins text-13xl flex flex-col items-start justify-start gap-[7px] self-stretch">
                      <b className="mq1050:text-7xl mq450:text-lgi relative self-stretch">
                        Entire Ecosystem
                      </b>
                      <div className="font-dm-sans-desktop-24px-regular text-lightsteelblue mq450:text-lgi relative self-stretch text-5xl">
                        <p className="m-0">
                          {docs.universityName} University has an active student
                          self-government,
                        </p>
                        <p className="m-0">
                          which is an element of the general system of
                          management of educational process in the university
                          and implies maximum consideration of interests of
                          students.
                        </p>
                        <p className="m-0">{`process at the university and assumes maximum consideration of interests,`}</p>
                        <p className="m-0">
                          needs of students on the basis of studying their
                          public opinion.
                        </p>
                      </div>
                    </div>
                  </div> */}
