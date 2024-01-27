import { NextResponse } from "next/server";
import { ConnectDB  } from "@/lib/config/database";
import TodoModel from "@/lib/config/models/TodoModel";


const LoadDB = async()=>{
    await ConnectDB();
}

LoadDB();

export async function GET(request){

    const todos = await TodoModel.find({})
    console.log(todos)
    return NextResponse.json({todos:todos})
} 
export async function POST(request ){

    const {title , description } = await request.json();

    await TodoModel.create({
        title,
        description
    })
    return NextResponse.json({msg:"Todo Created "})
} 
export async function DELETE(request ){

    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    
    await TodoModel.findByIdAndDelete(mongoId);
        return NextResponse.json({msg:"Todo Deleted "})
} 
export async function PUT(request ){

    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    
    await TodoModel.findByIdAndUpdate(mongoId,
        {
            $set:{
                isCompleted:true
            }
        });
        return NextResponse.json({msg:"Todo Completed "})
} 