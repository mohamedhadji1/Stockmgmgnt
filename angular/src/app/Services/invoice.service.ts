import { Injectable } from '@angular/core';
import { Order } from '../Models/Order';
import { Product } from '../Models/Product';
import { User } from '../Models/User';

export interface InvoiceProduct {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  invoiceNumber: string;
  orderDate: Date;
  clientDetails: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  agentDetails: {
    name: string;
  };
  products: InvoiceProduct[];
  subtotal: number;
  tva: number;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoiceCounter: number = 1;

  constructor() {}

  generateInvoice(order: Order, productList: Product[], client: User, agent: User): Invoice {
    // Generate invoice products array
    const invoiceProducts: InvoiceProduct[] = [];
    let subtotal = 0;

    order.products.forEach((quantity: number, productId: number) => {
      const product = productList.find(p => p.id === productId);
      if (product) {
        const total = product.price * quantity;
        subtotal += total;

        invoiceProducts.push({
          name: product.name ?? 'Unnamed Product',
          quantity: quantity,
          unitPrice: product.price,
          total: total
        });
      }
    });

    // Calculate total amount with TVA
    const tvaAmount = subtotal * (order.tva / 100);
    const totalAmount = subtotal + tvaAmount;

    // Generate unique invoice number (you might want to implement a more sophisticated system)
    const invoiceNumber = this.generateInvoiceNumber();

    // Create and return the invoice object
    const invoice: Invoice = {
      invoiceNumber: invoiceNumber,
      orderDate: order.date,
      clientDetails: {
        name: client.username || 'Unknown User',
        phoneNumber: String(client.numtel) || 'N/A',
        email: client.email || 'N/A'
      },
      agentDetails: {
        name: agent.username || 'Unknown Agent'
      },
      products: invoiceProducts,
      subtotal: subtotal,
      tva: order.tva,
      totalAmount: totalAmount
    };

    return invoice;
  }

  private generateInvoiceNumber(): string {
    // Get current date components
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Format: INV-YYMMDD-XXXX where XXXX is a sequential number
    const sequentialNumber = this.invoiceCounter.toString().padStart(4, '0');
    this.invoiceCounter++;

    return `INV-${year}${month}${day}-${sequentialNumber}`;
  }

  // Optional: Method to generate PDF invoice
  generatePDFInvoice(invoice: Invoice): void {
    // Implement PDF generation logic here if needed
    // You can use jsPDF or other PDF libraries
  }

  // Optional: Method to save invoice to backend
  saveInvoice(invoice: Invoice): void {
    // Implement save logic here if needed
    // This could involve making an HTTP request to your backend
  }
}
