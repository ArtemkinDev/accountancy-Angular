import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../shared/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: [ './add-category.component.scss' ]
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoryService: CategoriesService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if ( !form.invalid ) {
      let { name, capacity } = form.value;

      if ( capacity < 0 ) capacity *= -1;
      const category = new Category(name, capacity);

      this.categoryService.createNewCategory(category)
        .subscribe((category: Category) => {
          form.reset();
          form.form.patchValue({ capacity: 1 });
          this.onCategoryAdd.emit(category);
        })
    }

  }

}
