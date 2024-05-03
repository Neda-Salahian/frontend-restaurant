return (
    <>
      {showPreloader && <PreloaderComponent />} {/* اگر showPreloader true باشد، preload نمایش داده شود */}
      {!showPreloader && ( /* اگر showPreloader false باشد، محتوای اصلی نمایش داده شود */
        <UserContext.Provider
          value={{ isLoggedIn, setIsLoggedIn, username, setUsername, userRole, setUserRole, isAdmin, setIsAdmin }}
        >
          {/* بقیه کد JSX اینجا قرار می‌گیرد */}
        </UserContext.Provider>
      )}
    </>
  );
  