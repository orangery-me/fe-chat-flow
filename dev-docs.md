### npm

- Sau khi lấy code về nhớ `npm install` để get các dependencies nka :>

### Hooks

1. useAuth() : Lấy thông tin về user và login, logout function

```
    const info = useAuth()
    const user = info.user
    const login = info.login
    ....
```

2. useMessages(roomId): Lấy các messages của một roomId bất kỳ

```
    const messages = useMessages(roomId)
```

### Route

- Define các route trong main.jsx

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/room/:id" element={<ChatRoom />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
```

- Lấy roomId từ roomId: ` useParam()`

- File `App.jsx`: Xác định đã đăng nhập chưa để điều hướng đến `AuthenticatedApp` hoặc `UnauthenticatedApp`
