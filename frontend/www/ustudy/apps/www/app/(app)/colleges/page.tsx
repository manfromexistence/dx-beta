"use client"

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
import { ArrowUpRight, Filter, Heart, HeartOff } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import FrameComponent from "@/components/specialty-page/frame-component"
import { useToast } from "@/registry/default/ui/use-toast"
import { Toggle } from "@/components/ui/toggle"

// Firebase Configurations
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

const SpecialtyPage: NextPage = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true)
      const q = query(collection(db, "universities"))
      const querySnapshot = await getDocs(q)
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDocs(newDocs)
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
      setLoading(false)
    }
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
    <div className="relative box-border flex w-full flex-col items-start justify-start overflow-hidden bg-black px-0 pb-3.5 pt-0 leading-[normal] tracking-[normal]">
      <FrameComponent />
      <section className="font-headings-desktop-poppins-16px-bold text-blueviolet-200 mq1050:box-border mq1050:pb-10 mq750:box-border mq750:pb-[26px] !mx-auto box-border flex w-[1398px] max-w-full flex-row items-start justify-center px-5 pb-[62px] pt-0 text-center text-xl">
        <div className="mq1050:gap-[40px] mq750:gap-[20px] flex w-[1042px] max-w-full flex-col items-end justify-start gap-[81px]">
          <div className="box-border flex max-w-full flex-row items-start justify-end self-stretch py-0 pl-0">
            <div className="mq1050:gap-[38px] mq750:gap-[19px] flex max-w-full flex-1 flex-row flex-wrap items-end justify-start gap-[77px]">
              <div className="mq750:gap-[20px] flex min-w-[314px] max-w-full flex-1 flex-col items-start justify-start gap-[41px]">
                <button className="border-dimgray rounded-21xl box-border flex w-[122px] cursor-pointer flex-row items-start justify-start gap-[9px] rounded-[5px] border border-DEFAULT border-solid bg-black px-[18px] py-1.5">
                  <div className="border-dimgray rounded-21xl relative box-border hidden h-[35px] w-[122px] border-DEFAULT border-solid bg-black" />
                  <Filter className="text-primary size-3" />
                  <div className="flex flex-col items-start justify-start px-0 pb-0 pt-px">
                    <div className="font-headings-desktop-poppins-16px-bold text-dimgray relative z-[1] inline-block min-w-[39px] text-left text-xs font-medium">
                      Filters
                    </div>
                  </div>
                </button>
                <div className="admin-panel-lists w-full">
                  {docs.map((items) => (
                    <div
                      key={items.id}
                      className="z-10 overflow-hidden rounded-md border !p-0 transition-all hover:scale-105"
                    >
                      <div className="text-11xl font-headings-desktop-poppins-16px-regular text-shade-white relative box-border flex max-w-full flex-1 flex-col items-start justify-start gap-[24.6px] pb-[24.4px] pl-0 pt-0 text-left">
                        {/* <div className="absolute inset-x-0 bottom-0 !m-0 h-[364.7px] w-full rounded [background:linear-gradient(#000,_#000),_#d9d9d9]" /> */}
                        <div className="relative z-10 flex max-w-full flex-row items-start justify-start self-stretch">
                          {items.images && items.images.length > 0 ? (
                            items.images.map((index: any) => (
                              <div key={index}>
                                <img
                                  className="relative h-[263.5px] !min-w-[500px] flex-1 overflow-hidden rounded-b-none rounded-t-md object-cover "
                                  alt="Images"
                                  src={index}
                                />
                              </div>
                            ))
                          ) : items.image ? (
                            <img
                              className="relative h-[263.5px] max-w-full flex-1 overflow-hidden rounded-b-none rounded-t-md object-cover"
                              alt="Image"
                              src={items.image}
                            />
                          ) : (
                            ""
                          )}

                          {items.images && items.images.length > 0 ? (
                            ""
                          ) : items.image ? (
                            ""
                          ) : (
                            <img
                              className="rounded-t-8xs relative z-[1] h-[263.5px] max-w-full flex-1 overflow-hidden rounded-b-none object-cover"
                              alt="No Image"
                              src="/rectangle14230.png"
                            />
                          )}
                          {/* {items.logo ? (
                            <Avatar className="absolute bottom-[-9.2px] left-[29px] z-[2]">
                              <AvatarImage src={items.logo} alt="@Ustudy" />
                              <AvatarFallback>UY</AvatarFallback>
                            </Avatar>
                          ) : (
                            <img
                              className="absolute bottom-[-9.2px] left-[29px] z-[2] !m-0 size-auto min-h-[104.2px] min-w-[126.9px] object-cover"
                              loading="lazy"
                              alt=""
                              src={"/rectangle14231.png"}
                            />
                          )} */}
                          <Avatar className="absolute bottom-[-9.2px] left-[29px] z-[2]">
                            <AvatarImage src={items.logo} alt="@Ustudy" />
                            <AvatarFallback>UY</AvatarFallback>
                          </Avatar>
                        </div>



                        <div className="box-border flex w-[461.6px] max-w-full flex-row items-start justify-start px-[29px] py-0">
                          <div className="mq450:flex-wrap flex max-w-full flex-1 flex-row items-end justify-between gap-[20px]">

                            <Link href={`/colleges/${items.id}`}>
                              <div className="flex w-full flex-col items-start justify-start gap-1">
                                <h2 className="z-[1] w-[125px] truncate text-sm">
                                  {items.universityName || "Astana It"}
                                </h2>

                                <div className="font-nunito-sans z-10 box-border flex w-full flex-row items-start justify-start py-0 pb-5 text-xs">
                                  <div className="text-overflow-clamp text-muted-foreground relative z-[1] flex-1 shrink-0 text-sm leading-relaxed">
                                    {items.universityDescription || "No Description"}
                                  </div>
                                </div>
                                <div className="font-nunito-sans z-10 box-border flex size-10 flex-row items-center justify-center rounded-full border py-0 text-xs">
                                    {items.universityCode || "503"}
                                </div>
                              </div>
                            </Link>

                            <div className="absolute bottom-[20px] right-[25px] z-10 flex w-fit items-end justify-end gap-5 rounded-md">
                              {/* <Toggle onPressedChange={(e:any) => setFavorite(e.target.value)} className="border bg-red-500 !p-3" aria-label="Toggle bold">
                                { favorite ? <HeartOff className="size-7" /> : <Heart className="size-7" />}
                              </Toggle> */}
                              <Link className="rounded-md border p-3" href={`/colleges/${items.id}`}>
                                <ArrowUpRight className="size-7" />
                              </Link>
                            </div>



                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpecialtyPage
