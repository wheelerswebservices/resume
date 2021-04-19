import { Injectable } from '@angular/core';
import {EmploymentType, Experience} from "./experience";
import {Observable, of} from "rxjs";
import {Month} from "../shared/date";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor() { }

  getExperience(): Observable<Experience[]> {

    const experience: Experience[] = [
      {
        id: 1,
        company: 'Bravo LT',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices urna diam, eget sodales urna volutpat non. Sed vulputate tortor ut molestie commodo. Praesent aliquam magna quis mauris luctus molestie. Quisque sed libero quis justo malesuada ultricies. Cras venenatis, quam in bibendum congue, leo purus lobortis nibh, sit amet varius ante arcu sed diam. Vivamus auctor ipsum in sem dignissim, quis dapibus nulla ultrices. Sed a eros sed mi condimentum facilisis.',
        end: null,
        image: null,
        location: {
          address: '40 Monroe Center St NW',
          city: 'Grand Rapids',
          state: 'Michigan',
          zip: '49503'
        },
        project: 'Gordon Ordering',
        role: 'Senior Software Developer',
        start: {
          month: Month.Apr,
          year: 2021
        },
        type: EmploymentType.FullTime
      },
      {
        id: 2,
        company: 'Verizon',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices urna diam, eget sodales urna volutpat non. Sed vulputate tortor ut molestie commodo. Praesent aliquam magna quis mauris luctus molestie. Quisque sed libero quis justo malesuada ultricies. Cras venenatis, quam in bibendum congue, leo purus lobortis nibh, sit amet varius ante arcu sed diam. Vivamus auctor ipsum in sem dignissim, quis dapibus nulla ultrices. Sed a eros sed mi condimentum facilisis.',
        end: {
          month: Month.Apr,
          year: 2021
        },
        image: null,
        location: null,
        project: 'Network Planning Platform',
        role: 'Cloud Architect',
        start: {
          month: Month.Oct,
          year: 2020
        },
        type: EmploymentType.FullTime
      }
    ];
    return of(experience);
  }

}


