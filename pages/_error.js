import Link from 'next/link'
function Error({ statusCode }) {
  return (
    <div>
    <main
        aria-labelledby="pageTitle"
        class="flex items-center justify-center h-screen bg-gray-100  border-2"
      >
        <div class="p-4 space-y-4">
          <div class="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
            <p class="font-semibold text-red-500 text-9xl dark:text-red-600 w-full text-center desktop:text-left">{statusCode}</p>
            <div class="space-y-2">
              <h1 id="pageTitle" class="flex items-center space-x-2">
                <div class="bx bxs-error text-red-500 bx-sm" />
                <span class="text-xl font-medium text-gray-600 sm:text-2xl dark:text-light">
                  {statusCode==404 ? "Oops! Page not found." : "Something went wrong, please try again later, sorry for the inconvenience."}
                </span>
              </h1>
              <p class="text-base font-normal text-gray-600 dark:text-gray-300">
                The page you ara looking for was not found.
              </p>
              <p class="text-base font-normal text-gray-600 dark:text-gray-300">
                You may return to
                <Link href="/"><a class="pl-2 text-blue-600 hover:underline dark:text-blue-500">home page</a></Link>
              </p>
            </div>
          </div>
        </div>
      </main>
  </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error