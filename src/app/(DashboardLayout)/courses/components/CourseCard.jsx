'use client';
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  // Default image if no thumbnail is available
  const thumbnailUrl = course.thumbnail 
    ? course.thumbnail 
    : 'https://via.placeholder.com/300x200?text=Course+Thumbnail';

  // Format price
  const formattedPrice = course.price ? `$${parseFloat(course.price).toFixed(2)}` : 'Free';

  // Get enrollment count
  const enrollmentCount = course.enrollmentCount || 0;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s',
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          image={thumbnailUrl}
          alt={course.title}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {course.title}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Chip 
            label={formattedPrice} 
            color={course.price ? "primary" : "success"} 
            size="small" 
            variant="outlined"
          />
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 1,
            height: '40px', 
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          {course.description}
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {course.tags && course.tags.split(',').map((tag, index) => (
            <Chip 
              key={index} 
              label={tag.trim()} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <PeopleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {enrollmentCount} {enrollmentCount === 1 ? 'Student Enrolled' : 'Students Enrolled'}
        </Typography>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
        <Chip 
          label={course.status || 'Draft'} 
          color={course.status === 'Published' ? 'success' : 'default'} 
          size="small"
        />
        <Box>
          <Tooltip title="View Details">
            <Link href={`/courses/${course.$id}`} passHref>
              <IconButton color="info" size="small">
                <VisibilityIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edit Course">
            <Link href={`/courses/edit/${course.$id}`} passHref>
              <IconButton color="primary" size="small">
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete Course">
            <IconButton color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
      <Divider />
      <Box px={2} py={1}>
        <Stack direction="row" spacing={1}>
          <Link href={`/courses/content/${course.$id}`} passHref style={{ width: '100%' }}>
            <Button 
              variant="contained" 
              size="small" 
              fullWidth
              startIcon={<VideoLibraryIcon />}
              color="primary"
            >
              Manage Content
            </Button>
          </Link>
          <Link href={`/courses/chat/${course.$id}`} passHref style={{ width: '100%' }}>
            <Button 
              variant="outlined" 
              size="small" 
              fullWidth
              startIcon={<ChatIcon />}
              color="secondary"
            >
              Chat
            </Button>
          </Link>
        </Stack>
      </Box>
    </Card>
  );
};

export default CourseCard; 