import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ViewService} from "../shared/service/view.service";
import {ProjectFacade} from "../core/store/project/project.facade";
import {ProjectCompositeState, ProjectState} from "../core/store/project/project.state";
import {filter, takeUntil} from "rxjs/operators";
import {FilterService} from "../shared/service/filter.service";
import {Skill} from "../core/store/skill/skill.state";
import {MatDialog} from "@angular/material/dialog";
import {ProjectDialogComponent} from "../shared/dialog/project-dialog.component";

@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: [
    './project.component.scss',
    '../shared/carousel/carousel.component.scss'
  ]
})
export class ProjectComponent implements OnDestroy, OnInit {

  constructor(
    public dialog: MatDialog,
    private facade: ProjectFacade,
    private filterService: FilterService,
    private viewService: ViewService
  ) {}

  destroyed$ = new Subject<void>();
  state: ProjectCompositeState;
  skillShouldRender: boolean;
  skillSortBy: string = 'Name';
  skillTarget: string;
  projectTarget: string;

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.viewService.projectShouldEnable(false);

    this.facade.retrieve()
      .pipe(
        takeUntil(this.destroyed$),
        filter(state => !!state?.projects)
      )
      .subscribe(state => {
        this.state = state;
        this.viewService.projectShouldEnable(true);
      });

    this.viewService.skillShouldRender$.subscribe(val => {
      this.skillShouldRender = val;
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(ProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getSkills(ids: string[]): Skill[] {
    return !!this.state?.skills ? this.state.skills.filter(skill => ids.includes(skill.id)) : [];
  }

  getSkillNames(ids: string[]): string[] {
    return this.getSkills(ids)
      .map(skill => skill.name)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((n1, n2) => (n1 == n2 ? 0 : n1 > n2 ? 1 : -1) * 1);
  }

  getSkillTypes(ids: string[]): string[] {
    return this.getSkills(ids)
      .map(skill => skill.type)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((n1, n2) => (n1 == n2 ? 0 : n1 > n2 ? 1 : -1) * 1);
  }

  renderSkillView(){
    if(!this.skillShouldRender){
      this.viewService.skillShouldRender(true);
    }
  }

  setProjectFilter(value: string): void {

    this.renderSkillView();
    this.skillTarget = null;

    if(!this.skillShouldRender){
      this.viewService.skillShouldRender(true);
    }
    if(this.projectTarget === value){
      this.projectTarget = null;
      this.filterService.setTarget('');
      return;
    }
    this.projectTarget = value;
    this.filterService.setTarget(value);
  }

  setSkillFilter(value: string): void {

    this.renderSkillView();
    this.projectTarget = null;

    if(this.skillTarget === value){
      this.skillTarget = null;
      this.filterService.setTarget('');
      return;
    }
    this.skillTarget = value;
    this.filterService.setTarget(value);
  }

  setSkillSortBy(sortBy: string): void {
    this.skillSortBy = sortBy;
  }
}
