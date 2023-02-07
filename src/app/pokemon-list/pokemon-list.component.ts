import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import {Pokemon} from '../services/pokemons';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: any[] = [];
  page = 0;
  totalPokemons: number = 0;
  itemsPerPage = 10;
  sortOrder = 'asc'; 
  sortBy = 'id'; 
  searchTerm: string = '';

  constructor(
    private dataservice: DataService,
    private router: Router
  ) { }

  //dedicated page 
  goToPokemonDetails(name: string) {
    // console.log(name);
    this.dataservice.getPokemon(name).subscribe(pokemon => {
      console.log(pokemon);
      this.router.navigate([`/pokemon-list/${name}`], { state: { pokemon } });
    });
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  //get pokemons
  getPokemons() {
    this.dataservice.getPokemons(101, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach((result: any) => {
          this.dataservice.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              this.filteredPokemons = this.pokemons;
              // console.log(this.pokemons)
            });
        });
      })
  }

  // for searching 
  search() {
    if (this.searchTerm != "") {
      this.filteredPokemons = this.pokemons.filter((pokemon) => {
        return (pokemon.name.toLowerCase() === this.searchTerm.toLowerCase() || pokemon.id.toString() === this.searchTerm.replace(/^0+/, '') || pokemon.types[0].type.name === this.searchTerm.toLowerCase());
      });
    }
    else {
      this.filteredPokemons = this.pokemons;
    }
  }

  //for sorting
  sort(sortBy: string) {
    let sortKey = sortBy.split('_')[0];
    let sortDirection = sortBy.split('_')[1];

    this.sortBy = sortKey;
    this.sortOrder = sortDirection;

    this.filteredPokemons.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
