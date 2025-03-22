
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  UserRound 
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
];

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex flex-1 w-full items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuCheckboxItem checked>
                  All Transactions
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Predicted Fraud
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Reported Fraud
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Non-Fraud
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="netbanking">Net Banking</SelectItem>
                <SelectItem value="creditcard">Credit Card</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="ml-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
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
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
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
                  <TableCell className="text-right">₹{transaction.amount.toLocaleString()}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">7</span> of <span className="font-medium">100</span> transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
