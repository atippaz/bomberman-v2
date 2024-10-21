
gnome-terminal -- bash -c "go run server/server.go; exec bash"

gnome-terminal -- bash -c "cd client && npm run dev; exec bash"
