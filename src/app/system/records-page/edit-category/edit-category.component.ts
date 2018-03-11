import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../shared/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { Message } from '../../../shared/message';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: [ './edit-category.component.scss' ]
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.onSelectChange();
    this.message = new Message('danger', '');
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;

    if ( capacity < 0 ) capacity *= -1;

    let category = new Category(name, capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category).subscribe((cat: Category) => {
      this.onCategoryEdit.emit(category);
      this.showMessage({
        text: 'Категория успешно изменена',
        type: 'success'
      });
    })
  }

  onSelectChange() {
    this.currentCategory = this.categories.find((c: Category) => {
      return c.id === +this.currentCategoryId
    });

  }

  showMessage(message: Message) {
    this.message = message;

    window.setTimeout(()=>{
      this.message.text = '';
    }, 2000)
  }

}
