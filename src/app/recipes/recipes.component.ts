import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private router:Router,
              private route:ActivatedRoute,
              private dataStorageService:DataStorageService ) { }

  ngOnInit() {
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
}
