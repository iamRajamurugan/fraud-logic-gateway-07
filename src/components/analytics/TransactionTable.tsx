
import { useState } from "react";
import { 
  Calendar, 
  ChevronDown, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  UserRound,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock transaction data
const transactions = [
  {
    id: "TX78945612",
    date: "2023-09-12 14:32:05",
    payerId: "PYRID4782",
    payeeId: "PYEID6523",
    amount: 2500,
    channel: "UPI",
    paymentMode: "Bank Account",
    gatewayBank: "HDFC Bank",
    isPredicted: true,
    isReported: true,
  },
  {
    id: "TX78945613",
    date: "2023-09-12 15:45:12",
    payerId: "PYRID8246",
    payeeId: "PYEID1892",
    amount: 5300,
    channel: "Net Banking",
    paymentMode: "Debit Card",
    gatewayBank: "ICICI Bank",
    isPredicted: true,
    isReported: false,
  },
  {
    id: "TX78945614",
    date: "2023-09-13 09:15:48",
    payerId: "PYRID3327",
    payeeId: "PYEID9145",
    amount: 1850,
    channel: "Credit Card",
    paymentMode: "Credit Card",
    gatewayBank: "Axis Bank",
    isPredicted: false,
    isReported: false,
  },
  {
    id: "TX78945615",
    date: "2023-09-13 11:22:30",
    payerId: "PYRID7792",
    payeeId: "PYEID2376",
    amount: 8750,
    channel: "UPI",
    paymentMode: "Bank Account",
    gatewayBank: "SBI",
    isPredicted: false,
    isReported: false,
  },
  {
    id: "TX78945616",
    date: "2023-09-14 13:45:22",
    payerId: "PYRID1142",
    payeeId: "PYEID7723",
    amount: 3200,
    channel: "Wallet",
    paymentMode: "Wallet",
    gatewayBank: "Paytm",
    isPredicted: true,
    isReported: true,
  },
  {
    id: "TX78945617",
    date: "2023-09-14 16:18:05",
    payerId: "PYRID9854",
    payeeId: "PYEID3346",
    amount: 6700,
    channel: "Net Banking",
    paymentMode: "Bank Account",
    gatewayBank: "HDFC Bank",
    isPredicted: false,
    isReported: false,
  },
  {
    id: "TX78945618",
    date: "2023-09-15 10:32:45",
    payerId: "PYRID2251",
    payeeId: "PYEID8861",
    amount: 4300,
    channel: "UPI",
    paymentMode: "Bank Account",
    gatewayBank: "ICICI Bank",
    isPredicted: true,
    isReported: false,
  },
  {
    id: "TX78945619",
    date: "2023-09-15 14:20:15",
    payerId: "PYRID6732",
    payeeId: "PYEID4421",
    amount: 7200,
    channel: "Credit Card",
    paymentMode: "Credit Card",
    gatewayBank: "HDFC Bank",
    isPredicted: false,
    isReported: false,
  },
  {
    id: "TX78945620",
    date: "2023-09-16 09:05:38",
    payerId: "PYRID9912",
    payeeId: "PYEID5573",
    amount: 12500,
    channel: "UPI",
    paymentMode: "Bank Account",
    gatewayBank: "SBI",
    isPredicted: true,
    isReported: true,
  },
  {
    id: "TX78945621",
    date: "2023-09-16 16:42:19",
    payerId: "PYRID3388",
    payeeId: "PYEID8824",
    amount: 9300,
    channel: "Net Banking",
    paymentMode: "Debit Card",
    gatewayBank: "ICICI Bank",
    isPredicted: true,
    isReported: false,
  },
];

type FilterOptions = {
  showPredicted: boolean;
  showReported: boolean;
  showNonFraud: boolean;
  channel: string;
  payerId: string;
  payeeId: string;
  dateFrom: string;
  dateTo: string;
};

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filters, setFilters] = useState<FilterOptions>({
    showPredicted: true,
    showReported: true,
    showNonFraud: true,
    channel: "all",
    payerId: "",
    payeeId: "",
    dateFrom: "",
    dateTo: "",
  });

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search term filter
    if (
      searchTerm &&
      !transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Fraud status filters
    if (
      (transaction.isPredicted && !filters.showPredicted) ||
      (transaction.isReported && !filters.showReported) ||
      (!transaction.isPredicted && !transaction.isReported && !filters.showNonFraud)
    ) {
      return false;
    }

    // Channel filter
    if (filters.channel !== "all" && transaction.channel !== filters.channel) {
      return false;
    }

    // Payer ID filter
    if (
      filters.payerId &&
      !transaction.payerId.toLowerCase().includes(filters.payerId.toLowerCase())
    ) {
      return false;
    }

    // Payee ID filter
    if (
      filters.payeeId &&
      !transaction.payeeId.toLowerCase().includes(filters.payeeId.toLowerCase())
    ) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      const txDate = new Date(transaction.date);
      
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        if (txDate < fromDate) return false;
      }
      
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999); // End of the day
        if (txDate > toDate) return false;
      }
    }

    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleFilterChange = (filterName: keyof FilterOptions, value: any) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const resetFilters = () => {
    setFilters({
      showPredicted: true,
      showReported: true,
      showNonFraud: true,
      channel: "all",
      payerId: "",
      payeeId: "",
      dateFrom: "",
      dateTo: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <Card className="shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex flex-1 w-full items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transaction ID..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page when search changes
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Fraud Status
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuCheckboxItem 
                  checked={filters.showPredicted}
                  onCheckedChange={(checked) => handleFilterChange("showPredicted", checked)}
                >
                  Predicted Fraud
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filters.showReported}
                  onCheckedChange={(checked) => handleFilterChange("showReported", checked)}
                >
                  Reported Fraud
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filters.showNonFraud}
                  onCheckedChange={(checked) => handleFilterChange("showNonFraud", checked)}
                >
                  Non-Fraud
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:col-span-3">
            <Select 
              value={filters.channel} 
              onValueChange={(value) => handleFilterChange("channel", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Net Banking">Net Banking</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Input
              placeholder="Payer ID"
              value={filters.payerId}
              onChange={(e) => handleFilterChange("payerId", e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <Input
              placeholder="Payee ID"
              value={filters.payeeId}
              onChange={(e) => handleFilterChange("payeeId", e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="From Date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="To Date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <Button variant="outline" className="w-full" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>

          <div className="md:col-span-3">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px]">Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Payer ID</TableHead>
                  <TableHead>Payee ID</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Gateway Bank</TableHead>
                  <TableHead>Predicted Fraud</TableHead>
                  <TableHead>Reported Fraud</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {transaction.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                          {transaction.payerId}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.payeeId}</TableCell>
                      <TableCell className="text-right font-medium">₹{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>{transaction.channel}</TableCell>
                      <TableCell>{transaction.paymentMode}</TableCell>
                      <TableCell>{transaction.gatewayBank}</TableCell>
                      <TableCell>
                        {transaction.isPredicted ? (
                          <div className="flex items-center text-red-500">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Yes
                          </div>
                        ) : (
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            No
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {transaction.isReported ? (
                          <div className="flex items-center text-red-500">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Yes
                          </div>
                        ) : (
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            No
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No transactions found matching the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Display pages around current page
                let pageToShow;
                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === pageToShow}
                      onClick={() => setCurrentPage(pageToShow)}
                    >
                      {pageToShow}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        
        <div className="text-sm text-muted-foreground mt-2">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
        </div>
      </div>
    </Card>
  );
}
