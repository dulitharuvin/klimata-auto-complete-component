import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '../Ingredient';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  formGroup: FormGroup;

  subject: Subject<any> = new Subject();

  autoCompleteResults: Ingredient[] = [];

  ingredientList: Ingredient[] = [];

  selectedIngredient: Ingredient | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private fetchDataService: FetchDataService
  ) {
    this.formGroup = this.formBuilder.group({
      foodAutoComplete: [this.selectedIngredient?.name],
    });
  }

  ngOnInit(): void {
    this.getIngredientList();

    this.subject.pipe(debounceTime(500)).subscribe((inputValue: string) => {
      if (!inputValue) {
        this.autoCompleteResults = [];
        return;
      }
      this.autoCompleteResults = this.ingredientList.filter((ingredient) => {
        return ingredient.name
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase());
      });
    });
  }

  public searchForFood(event: any) {
    this.subject.next(event.target.value);
  }

  selectFood(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

  private getIngredientList() {
    this.fetchDataService.fetchIngredients().subscribe(
      (data: []) => {
        this.ingredientList = data.map((o) => {
          return new Ingredient(o);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
