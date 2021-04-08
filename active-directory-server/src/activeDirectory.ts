import { Inject, Injectable } from '@nestjs/common';
import * as activedirectory from 'activedirectory';
import { UserDto } from "./types";

@Injectable()
export class ActiveDirectory {
    private readonly activeDirectory; 
    

    constructor () {
        var config = {
            url: process.env.URL,
            baseDN: process.env.BASEDN,
            username: process.env.USER,
            password: process.env.PASSWORD,
        }
        this.activeDirectory = new activedirectory(config)
    }

    async GetUsers() : Promise<UserDto[]> {
        return new Promise((resolve, reject) => {
			this.activeDirectory.findUsers('cn=*', true, function(err, users){
    	        if(err) {
		            console.log('ERROR: ' + JSON.stringify(err))
		            return []
		        }
		        console.log(users);

		        resolve(users);
            })
        })
        // return new Promise((resolve) => {
        //     resolve([{
        //         dn:"CN=Guest,CN=Users,DC=mydomain,DC=ru",
        //         sAMAccountName:"Guest",
        //         whenCreated:"20210207140220.0Z",
        //         pwdLastSet:"0",
        //         userAccountControl:"66082",
        //         cn:"Guest",
        //         description:"Built-in account for guest access to the computer/domain"
        //     }])
        // })
    }
}
