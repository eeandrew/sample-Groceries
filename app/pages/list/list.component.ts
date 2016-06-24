import {
 Component,
 ElementRef,
 OnInit,
 ViewChild 
} from '@angular/core';
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";
import {
  TextField
} from 'ui/text-field';

@Component({
  selector:'list',
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers:[GroceryListService]
})

export class ListComponent implements OnInit{
  groceryList:Array<Object>= [];
  grocery: string = '';
  isLoading:boolean = false;
  @ViewChild("groceryTextField") groceryTextField : ElementRef;
  constructor(private _groceryListService: GroceryListService) {}
  ngOnInit() {
    this.isLoading = true;
    this._groceryListService.load()
    .subscribe(loadedGroceries => {
      loadedGroceries.forEach((groceryObject) => {
        this.groceryList.unshift(groceryObject);
      });
      this.isLoading = false;
    });
  }
  add() {
    if(!this.grocery.trim()) {
      alert('Please Enter a Grocery Item');
      return;
    }
    let textField = <TextField> this.groceryTextField.nativeElement;
    textField.dismissSoftInput();
    this._groceryListService.add(this.grocery)
    .subscribe(
      groceryObject => {
        this.groceryList.unshift(groceryObject);
        this.grocery = "";
      },
      () => {
        alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
        this.grocery = "";
      }
    );
  }
  
}