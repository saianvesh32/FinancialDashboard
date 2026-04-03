"use client"

export function EmptyState({ message = "No data found" }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img
        src="/images/empty-state.png"
        alt="empty"
        className="w-40 h-40 opacity-80"
      />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  )
}