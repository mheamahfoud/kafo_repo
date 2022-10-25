<?php

namespace App\Http\Controllers\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\Models\Media;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        try {

        if($request->hasFile('images'))
        {
            $files = $request->images;//('file')[0];
            $temp_array=[];
        
            if (is_array($files) || is_object($files))
            {
               
                foreach($files as $file)
                { //Generate a unique name for the file.
                    $file_name = time().'_'.$file->getClientOriginalName();
                   // $path = $file->storeAs($temp_folder, $file_name);
                  //  Storage::disk('temp_files')->put($file_name, $file);
                    Storage::disk('temp_files')->put($file_name, file_get_contents($file));


                    array_push($temp_array,  $file_name);
                   
                }
            }
            
            return Response::respondSuccess(['file_name' => $temp_array]);
           // $output = $this->respondSuccess(__('messages.saved_successfully'), ['file_name' => $file_name]);
        } 
    }
        catch (Exception $e) {
        return Response::respondErrorValidation($e);
             
           // $output = $this->respondWentWrong($e);
        }
      //  return $output;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $media = Media::find($id);
        $file = explode('_', $media->file_name);

        return response()->download($media->getPath());
    }
    public function show1($id)
    {
        $media = Media::find($id);

        $file = explode('_', $media->file_name);
        
        return response()->download($media->getPath(), $file[1]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }

 
 
}
