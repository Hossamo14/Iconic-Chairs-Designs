

PROJECT ARCHITECTURE REFERENCE SHEET: ICONIC CHAIR DESIGN
================================================================================
link >>>  https://iconic-chair-design.netlify.app/  
===============================================================================

[1] LOCAL COMPILATION & DEPENDENCY MANAGEMENT
--------------------------------------------------------------------------------
- Environment Separation: The repository maintains absolute isolation by keeping 
  temporary compilation folders (node_modules/, .parcel-cache/, and dist/) 
  strictly inside the .gitignore file. This ensures only raw source assets are 
  tracked via Git.
- Bundler Engine (Parcel): Unlike basic file-watching setups (e.g., standard 
  Live Server extensions) that read raw disk strings directly, Parcel builds a 
  virtualized memory mapping. 
- URL Dependency Standard: To prevent production path breaks caused by Parcel's 
  file-hashing system, external resources are explicitly mapped as absolute 
  module dependencies:
  
  const jsonUrl = new URL("./chairs.json", import.meta.url);
  const response = await fetch(jsonUrl.href);
  const chairsArray = await response.json();

[2] THE DOUBLE PROMISE CHAIN & DATA PARSING
--------------------------------------------------------------------------------
- Stage 1 (fetch): Returns a Promise resolving the instant HTTP connection 
  headers and status codes (e.g., 200 OK) are verified.
- Stage 2 (.json()): Returns a second Promise because translating raw incoming 
  packet streams into native JavaScript array allocations in RAM is an intensive 
  background operation.
- Stream Optimization: Using the asynchronous .json() method allows processing 
  to happen off the main thread, unlike synchronous JSON.parse(), which freezes 
  the browser window during large execution routines.

[3] RUNTIME ENVIRONMENT & THE EVENT LOOP
--------------------------------------------------------------------------------
- Call Stack: A single-threaded LIFO (Last In, First Out) pipeline processing 
  synchronous operations (like math index calculations and local text switches) 
  in microseconds via Just-In-Time (JIT) bytecode compilation.
- Web APIs: Isolated background browser threads that take over asynchronous tasks 
  (network requests, asset downloads, timers) so the main thread remains free.
- Callback Queue & Event Loop: Once an asynchronous task completes, it drops a 
  signal into the queue. The Event Loop watches the Call Stack; the exact 
  millisecond the stack becomes empty, it pushes the waiting callback onto the 
  stack to execute.
- DOM Bridge: The structural gateway through which the JavaScript engine hands 
  updated object properties to the Rendering Engine, forcing a visual Reflow, 
  Paint, and GPU Layer Composition.

[4] INTERACTIVE PERFORMANCE OPTIMIZATIONS
--------------------------------------------------------------------------------
- Image Preloading: Eradicates the visual latency mismatch between instant text 
  updates and delayed image loads by pre-fetching and caching all assets into 
  system RAM at initialization using background image allocations.
- Timer Accumulation Fix: Eliminates layout thrashing and high CPU overhead 
  by enforcing explicit "gatekeeper clears" (clearInterval) before spinning up 
  new asynchronous iteration cycles.
- SVG Sprites (<use>): Repetitive structural icons are stored globally as inline 
  HTML symbols, avoiding external asset fetching delays. Active state shifts 
  are driven purely via highly efficient, hardware-accelerated CSS style classes 
  (e.g., .icon.muted { opacity: 0.3; }) instead of heavy DOM modification.
================================================================================

```
