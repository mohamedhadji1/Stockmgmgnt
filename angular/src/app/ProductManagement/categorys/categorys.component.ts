import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/Category';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent {
  categories : Category[] = [];

  categoryForm!: FormGroup;
  isUpdate = false;
  selectedCategory: any = null;

  category : Category;
  constructor(private fb: FormBuilder, private ps:ProductService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.category = {
      id: 0 ,
      name: ''
    }
  }

  ngOnInit(){
    this.ps.GetAllCategorys().subscribe((data)=>{
      this.categories = data;
      console.log("this.categories");
    });
  }
  // Open the modal
  openCategoryModal(modalContent: any, category: any = null) {
    this.isUpdate = !!category; // Check if it's an update or add operation
    this.selectedCategory = category;
    this.categoryForm.reset();
    
    if (this.isUpdate) {
      this.categoryForm.patchValue({ name: category.name });
    }

    //this.modalService.open(modalContent, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Add or Update Category
  submitCategory() {
    const categoryName = this.categoryForm.value.name;
    if (this.isUpdate && this.selectedCategory) {
      // Update the category
      this.selectedCategory.name = categoryName;
      this.ps.UpdateCat(this.selectedCategory).subscribe((data)=>{
        console.log(data);
      })
    } else {
      // Add a new category
      this.category.name = categoryName;
      this.ps.AddCategory(this.category).subscribe((data)=>{
        this.categories.push(data);
      })
      
    }

    //this.modalService.dismissAll();
  }

  // Delete Category
  deleteCategory(categoryId: number) {
    this.ps.DeleteCat(categoryId).subscribe((data)=>{
      console.log(data);
      this.categories = this.categories.filter((category) => category.id !== categoryId);
    })
    
  }
}
