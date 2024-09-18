
//@ts-nocheck
import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {format} from'date-fns'
const ReservationTable = ({reservation}) => {
  return (
    <div>



<Table className='w-[800px]'>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">listingId</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Checkin</TableHead>
      <TableHead>Checkout</TableHead>
      <TableHead> Status</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead className="text-right"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {reservation?.map((item)=>{




return(

    <TableRow>
      <TableCell className="font-medium">{item.listingId}</TableCell>
      <TableCell>{item.user.name}</TableCell>
      <TableCell>{format(new Date(item.startdate),'yyyy-MM-dd')}</TableCell>
      <TableCell>{format(new Date(item.enddate),'yyyy-MM-dd')}</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>${item.totalprice}</TableCell>
   
    </TableRow>



);
    })}
  </TableBody>
</Table>





    </div>
  )
}

export default ReservationTable