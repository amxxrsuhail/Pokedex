import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-detailed',
  templateUrl: './pokemon-detailed.component.html'
})
export class PokemonDetailedComponent implements OnInit {
  pokemon: any;
  route: any;

  constructor() { }

  ngOnInit() {
    this.pokemon = history.state.pokemon;
  }

  isLastItem(item: any) {
    return item === this.pokemon.abilities[this.pokemon.abilities.length - 1];
  }

}       
