"use client"

import { useAppContext } from "@/app/context/AppContext"

export default function LoadingModal() {
  const { loadingStatus } = useAppContext()

  if (loadingStatus === "idle" || loadingStatus === "done") return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      
      {/* Spinner */}
      <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white animate-spin mb-6" />

      {/* Status message */}
      {loadingStatus === "generating" && (
        <div className="text-center">
          <p className="text-white font-bold text-lg">Building your brand...</p>
        </div>
      )}

      {loadingStatus === "imaging" && (
        <div className="text-center">
          <p className="text-white font-bold text-lg">Creating your logo...</p>
        </div>
      )}

    </div>
  )
}