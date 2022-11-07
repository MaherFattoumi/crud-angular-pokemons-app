import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styles: [
  ]
})
export class SearchComponentComponent implements OnInit {
  // {..."a"..."ab"..."abz"..."ab"..."abc"...}
  searchTerms = new Subject<string>();
  // {...pokemonList(a)...pokemonList(ab)...pokemonList(abz)...}
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"abc"........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {......pokemonList(ab)...........pokemonList(abc)........}
    );
  }

  search(term: string){
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
