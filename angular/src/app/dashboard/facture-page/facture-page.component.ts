import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-facture-page',
  templateUrl: './facture-page.component.html',
  styleUrls: ['./facture-page.component.css']
})

export class FacturePageComponent {
factures : any[]=[];
  constructor(private factureService : ServicesService) { }
  ngOnInit(): void {
    this.fetchFactures();
  }

  fetchFactures(): any {
    this.factureService.fetchFactures().subscribe(
      (data: any[]) => {
        this.factures = data;
        console.log("factures : ",this.factures)
      },
      (error) => {
        console.error('Error fetching factures:', error);
      }
    );
  }
}