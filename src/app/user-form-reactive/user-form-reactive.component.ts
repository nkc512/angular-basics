import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form-reactive',
  templateUrl: './user-form-reactive.component.html',
  styleUrls: ['./user-form-reactive.component.css']
})
export class UserFormReactiveComponent implements OnInit {

  userReactive = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    skills: new FormArray([
      this.addSkillFormGroup()
    ])
  });
  user: User;
  addSkillFormGroup(): FormGroup {
    return new FormGroup({ skill: new FormControl('') });
  }
  removeSkillButtonClick(skillIndex: number): void {
    (this.userReactive.get('skills') as FormArray).removeAt(skillIndex);
    this.userReactive.markAsDirty();
    this.userReactive.markAsTouched();
  }
  addSkillButtonClick(): void {
    (this.userReactive.get('skills') as FormArray).push(this.addSkillFormGroup());
    console.log(this.userReactive.get('skills').value.length);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      if (Id) {
        this.getUser(Id);
        console.log('ngoninit', Id);
      }
    });
  }
  getUser(Id: string) {
    console.log('getUser', Id);
    this.userService.getUser(Id).subscribe(
      (user: User) => this.editUser(user),
      (err: any) => console.log(err)
    );

  }
  getUser1(Id: string) {// to get data from dummy variable present in UserService
    console.log('getUser', Id);
    this.editUser(this.userService.getUser1(Id));
  }
  editUser(user: User): void {
    console.log('editUser', user);
    this.userReactive.patchValue({ id: user.id, name: user.name, email: user.email });
    this.userReactive.setControl('skills' , this.setExistingSkills(user.skills));
  }
  setExistingSkills(skills: string[]): FormArray {
    const formArray = new FormArray([]);
    skills.forEach(data => {
      formArray.push(new FormGroup({
        skill: new FormControl(data)
      }));
    });
    return formArray;
  }

  reactiveSubmit() {
    console.log(this.userReactive.value);
    console.log('reach reactiveSubmit');
    this.user = this.userReactive.value;
    this.userService.save(this.user).subscribe(result => this.gotoUserList());
  }

  gotoUserList() {
    console.log('reach gotoUserList');
    this.router.navigate(['/users']);
  }

}
