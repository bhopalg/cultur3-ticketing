import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password">Event Password</label>
          <div className="relative">
            <Input
              id="password"
              // type={showPassword ? "text" : "password"}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter event password"
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              // onClick={() => setShowPassword(!showPassword)}
            >
              {/*{showPassword ? (*/}
              {/*  <EyeOff className="h-4 w-4 text-gray-500" />*/}
              {/*) : (*/}
              {/*  <Eye className="h-4 w-4 text-gray-500" />*/}
              {/*)}*/}
              <span className="sr-only">
                {/*{showPassword ? "Hide password" : "Show password"}*/}
              </span>
            </Button>
          </div>
        </div>

        {/*{error && (*/}
        {/*  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">*/}
        {/*    {error}*/}
        {/*  </div>*/}
        {/*)}*/}

        <Button
          type="submit"
          className="w-full bg-zinc-600 hover:bg-zinc-700"
          // disabled={isLoading}
        >
          {/*{isLoading ? "Verifying..." : "Access Event"}*/}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Need help? Contact event organizers</p>
      </div>
    </>
  );
}
