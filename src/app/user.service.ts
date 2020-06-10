import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    private usersUrl: string;
    private usersaddUrl: string;
    private userDummy: User[];
    getDummy(): User[] {
        this.userDummy.push({ id: '32da', name: 'Neetesh', email: 'nkc', skills: ['C++'] });

        return this.userDummy;
    }

    constructor(private http: HttpClient) {
        this.userDummy = [{ id: '32', name: 'Neetesh', email: 'nkc', skills: ['C++', 'Java'] },
        { id: '322', name: 'hi Neetesh', email: 'nkc', skills: ['Java'] }];
        this.usersUrl = 'http://localhost:8080/users';
        this.usersaddUrl = 'http://localhost:8080/adduser';

    }


    public getUser1(Id: string): User{ // For userDummy data
    return this.userDummy.find(user => {
        return user.id == Id;
    });
    }
    public getUser(Id: string): Observable<User>{
        return this.http.get<User>(this.usersUrl + '/' + Id);
    }
    public findAll(): Observable<User[]> {
        console.log('reach findAll');
        console.log('findall', this.http.get<User[]>(this.usersUrl));
        return this.http.get<User[]>(this.usersUrl);
    }

    public save(user: User) {
        console.log('reach save');
        return this.http.post<User>(this.usersaddUrl, user);
    }
}
