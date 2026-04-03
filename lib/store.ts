"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionType = "income" | "expense"
export type TransactionCategory = 
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Shopping"
  | "Food & Dining"
  | "Transportation"
  | "Entertainment"
  | "Bills & Utilities"
  | "Healthcare"
  | "Travel"
  | "Other"

export interface Transaction {
  id: string
  date: string
  description: string
  category: TransactionCategory
  amount: number
  type: TransactionType
}

export type Role = "Admin" | "Viewer"

interface FinanceState {
  transactions: Transaction[]
  role: Role
  isDarkMode: boolean
  searchQuery: string
  categoryFilter: TransactionCategory | "All"
  typeFilter: TransactionType | "All"
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
  
  // Actions
  setRole: (role: Role) => void
  toggleDarkMode: () => void
  setSearchQuery: (query: string) => void
  setCategoryFilter: (category: TransactionCategory | "All") => void
  setTypeFilter: (type: TransactionType | "All") => void
  setSortBy: (sort: "date" | "amount") => void
  setSortOrder: (order: "asc" | "desc") => void
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  editTransaction: (id: string, transaction: Omit<Transaction, "id">) => void
  deleteTransaction: (id: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

// Mock transactions data
const mockTransactions: Transaction[] = [
  { id: generateId(), date: "2024-01-15", description: "Monthly Salary", category: "Salary", amount: 5500, type: "income" },
  { id: generateId(), date: "2024-01-14", description: "Grocery Shopping", category: "Food & Dining", amount: 156.50, type: "expense" },
  { id: generateId(), date: "2024-01-13", description: "Freelance Project", category: "Freelance", amount: 1200, type: "income" },
  { id: generateId(), date: "2024-01-12", description: "Electric Bill", category: "Bills & Utilities", amount: 89.99, type: "expense" },
  { id: generateId(), date: "2024-01-11", description: "Netflix Subscription", category: "Entertainment", amount: 15.99, type: "expense" },
  { id: generateId(), date: "2024-01-10", description: "Gas Station", category: "Transportation", amount: 45.00, type: "expense" },
  { id: generateId(), date: "2024-01-09", description: "Restaurant Dinner", category: "Food & Dining", amount: 78.50, type: "expense" },
  { id: generateId(), date: "2024-01-08", description: "Stock Dividends", category: "Investment", amount: 320, type: "income" },
  { id: generateId(), date: "2024-01-07", description: "Online Shopping", category: "Shopping", amount: 234.99, type: "expense" },
  { id: generateId(), date: "2024-01-06", description: "Uber Rides", category: "Transportation", amount: 32.50, type: "expense" },
  { id: generateId(), date: "2024-01-05", description: "Doctor Visit", category: "Healthcare", amount: 150, type: "expense" },
  { id: generateId(), date: "2024-01-04", description: "Internet Bill", category: "Bills & Utilities", amount: 59.99, type: "expense" },
  { id: generateId(), date: "2024-01-03", description: "Coffee Shop", category: "Food & Dining", amount: 12.50, type: "expense" },
  { id: generateId(), date: "2024-01-02", description: "Weekend Trip", category: "Travel", amount: 450, type: "expense" },
  { id: generateId(), date: "2024-01-01", description: "New Year Bonus", category: "Salary", amount: 2000, type: "income" },
  { id: generateId(), date: "2023-12-28", description: "Gym Membership", category: "Healthcare", amount: 49.99, type: "expense" },
  { id: generateId(), date: "2023-12-25", description: "Christmas Shopping", category: "Shopping", amount: 389.99, type: "expense" },
  { id: generateId(), date: "2023-12-20", description: "Consulting Fee", category: "Freelance", amount: 800, type: "income" },
  { id: generateId(), date: "2023-12-15", description: "Monthly Salary", category: "Salary", amount: 5500, type: "income" },
  { id: generateId(), date: "2023-12-10", description: "Phone Bill", category: "Bills & Utilities", amount: 75, type: "expense" },
  { id: generateId(), date: "2023-11-15", description: "Monthly Salary", category: "Salary", amount: 5500, type: "income" },
  { id: generateId(), date: "2023-11-10", description: "Concert Tickets", category: "Entertainment", amount: 120, type: "expense" },
  { id: generateId(), date: "2023-10-15", description: "Monthly Salary", category: "Salary", amount: 5500, type: "income" },
  { id: generateId(), date: "2023-10-05", description: "Car Maintenance", category: "Transportation", amount: 280, type: "expense" },
  { id: generateId(), date: "2023-09-15", description: "Monthly Salary", category: "Salary", amount: 5500, type: "income" },
  { id: generateId(), date: "2023-08-15", description: "Monthly Salary", category: "Salary", amount: 5500, type: "income" },
]

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: "Admin",
      isDarkMode: false,
      searchQuery: "",
      categoryFilter: "All",
      typeFilter: "All",
      sortBy: "date",
      sortOrder: "desc",
      
      setRole: (role) => set({ role }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: generateId() }, ...state.transactions]
      })),
      editTransaction: (id, transaction) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...transaction, id } : t
        )
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
    }),
    {
      name: "finance-storage",
      partialize: (state) => ({
        transactions: state.transactions,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
)

// Computed selectors
export const useFilteredTransactions = () => {
  const { transactions, searchQuery, categoryFilter, typeFilter, sortBy, sortOrder } = useFinanceStore()
  
  return transactions
    .filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           t.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "All" || t.category === categoryFilter
      const matchesType = typeFilter === "All" || t.type === typeFilter
      return matchesSearch && matchesCategory && matchesType
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc" 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount
      }
    })
}

export const useFinanceStats = () => {
  const { transactions } = useFinanceStore()
  
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const totalBalance = totalIncome - totalExpenses
  
  return { totalIncome, totalExpenses, totalBalance }
}

export const useMonthlyData = () => {
  const { transactions } = useFinanceStore()
  
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
  const monthMap: Record<string, { income: number; expense: number; balance: number }> = {}
  
  months.forEach(month => {
    monthMap[month] = { income: 0, expense: 0, balance: 0 }
  })
  
  transactions.forEach((t) => {
    const date = new Date(t.date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[date.getMonth()]
    
    if (monthMap[month]) {
      if (t.type === "income") {
        monthMap[month].income += t.amount
      } else {
        monthMap[month].expense += t.amount
      }
      monthMap[month].balance = monthMap[month].income - monthMap[month].expense
    }
  })
  
  return months.map(month => ({
    month,
    ...monthMap[month]
  }))
}

export const useCategoryData = () => {
  const { transactions } = useFinanceStore()
  
  const categoryTotals: Record<string, number> = {}
  
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
    })
  
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
  
  return Object.entries(categoryTotals)
    .map(([category, amount], index) => ({
      category,
      amount,
      fill: colors[index % colors.length]
    }))
    .sort((a, b) => b.amount - a.amount)
}

export const categories: TransactionCategory[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Shopping",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Other"
]
