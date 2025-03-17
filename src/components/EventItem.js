import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

function EventItem({ event, onDelete }) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Ви дійсно хочете видалити цю подію?");
    if (confirmDelete) {
      onDelete(id); // Викликає функцію для видалення події
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {event.date}
          </Typography>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
          <Typography variant="body2" color="textPrimary" gutterBottom>
            Важливість: {event.priority}
          </Typography>

          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to={`/event/${event.id}`}
            style={{ marginRight: '8px' }}
          >
            Редагувати
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(event.id)}
          >
            Видалити
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default EventItem;



