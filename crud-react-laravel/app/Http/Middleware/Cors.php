<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
{
    $request->header('Access-Control-Allow-Origin', "*");
    $request->header('Access-Control-Allow-Methods', "PUT, POST, DELETE, GET, OPTIONS");
    $request->header('Access-Control-Allow-Headers', "Accept, Authorization, Content-Type");
    return $next($request);
   
}
}
