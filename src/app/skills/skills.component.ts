import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  constructor(fb: FormBuilder) { }

  // https://www.youtube.com/watch?v=lBi8cLsdNFA
  employeeForm = new FormGroup({
    fullName: new FormControl(''),
    skills: new FormArray([
      this.addSkillFormGroup()
    ])
  });
  addSkillFormGroup(): FormGroup
  {
    const skill = new FormGroup({
      skillName: new FormControl(''),
      experience: new FormControl('')
    });
    return skill;
  }
  removeSkillButtonClick(skillIndex: number): void{
    (this.employeeForm.get('skills') as FormArray).removeAt(skillIndex);
  }
  addSkillButtonClick(): void{
    (this.employeeForm.get('skills') as FormArray).push(this.addSkillFormGroup());
    console.log(this.employeeForm.get('skills').value.length);
  }

  ngOnInit(): void {
    console.log(typeof(this.employeeForm.get('skills')));
    console.log(this.employeeForm.get('skills'));
    console.log(this.employeeForm);

  }
  submit()
  {
    console.log(this.employeeForm.value);
  }

  
}
