import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    if (process.env.BACKEND_URL === undefined) {
        throw new Error('BACKEND_URL is not defined');
    }

    console.log('hello from api/route.ts');
    const formData = await req.formData();

    const res = await fetch(process.env.BACKEND_URL, {
        method: 'POST',
        body: formData
    });


    return res
}