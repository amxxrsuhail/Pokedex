import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-detailed',
  templateUrl: './pokemon-detailed.component.html',
  styleUrls: ['./pokemon-detailed.component.scss']
})
export class PokemonDetailedComponent implements OnInit {
  pokemon: any;
  route: any;

  constructor() { }

  ngOnInit() {
    this.pokemon = history.state.pokemon;
  }

  isLastItem(item:any) {
    return item === this.pokemon.abilities[this.pokemon.abilities.length - 1];
  }

}       
