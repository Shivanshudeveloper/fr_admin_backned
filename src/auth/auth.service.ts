import { Injectable,UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Request,Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { FRONTEND_URL } from 'src/config';

@Injectable()
export class AuthService {
    // private supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    constructor(private configService: ConfigService) {}
    private supabase = createClient(this.configService.get<string>('SUPABASE_URL'),this.configService.get<string>('SUPABASE_KEY'));

    async signInWithGoogle(): Promise<any> {
        const {data,error} = await this.supabase.auth.signInWithOAuth({
            provider: 'google',
            options:{
                redirectTo: `${FRONTEND_URL}/auth/google/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                  },
            }
        })
        if (error) {
            throw error;
        }
        return data;
    }

    async googleCallback(req:Request,res:Response): Promise<any> {
        const { access_token, refresh_token, expires_in, provider_token } = req.query;
    
    if (!access_token) {
      throw new UnauthorizedException('No access token provided');
    }

    // Verify the token (optional but recommended)
    const { data, error } = await this.supabase.auth.getUser(access_token as string)
    // console.log(data.user);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Save user information to the database or session
    // Example: Save user to database
    // const savedUser = await this.userService.saveUser(user);
    // Redirect the user to the home page
    // window.opener.postMessage({ user, access_token, refresh_token, expires_in }, window.location.origin);
    // window.close();
    res.json({user:data.user})
    };  
}
