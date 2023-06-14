export type JwtPayload = {
    email: string,
    iat: number,
    exp: number
}

export type AuthTokenSet = {
    accessToken: string,
    refreshToken: string
}

export type PresentableUser = {
    email: string,
    picture?: string,
    username: string,
    firstName: string,
    lastName: string
}


export type SignInRequest = {
    email: string,
    password: string
}

export type SignInResponse = {
    authTokenSet: AuthTokenSet,
    presentableUser: PresentableUser
}

export type SignUpRequest = {
    email: string, 
    password: string, 
    confirm: string,
    username: string, 
    firstName: string, 
    lastName: string
}

export type SignUpResponse = {
    email : string
}

export type VerifyResponse = 'success' | 'time out' | 'already confirmed' | 'not found'

export type Payload = {
    email: string,
    iat: number,
    exp: number
}