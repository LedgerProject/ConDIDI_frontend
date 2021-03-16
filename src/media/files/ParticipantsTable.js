export const Columns = [

    {
        field: 'participant', 
        headerName: 'Participant', 
        width: 180
    },
    {
        field: 'title', 
        headerName: 'Title', 
        width: 100
    },
    {
        field: 'article', 
        headerName: 'Article', 
        width: 150 
    }, 
    {
        field: 'applicationStatus', 
        headerName: 'Application Status', 
        width: 180 
    }, 
    {
        field: 'paymentStatus', 
        headerName: 'Payment Status', 
        width: 180 
    }, 
    {
        field: 'participation', 
        headerName: 'Participation', 
        width: 150
    }, 
    {
      field: 'participantTitle',
      headerName: 'Participant Title',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 230,
      valueGetter: (params) =>
        `${params.getValue('participant') || ''} ${params.getValue('title') || ''}`,
    },
  ];
  
export const Rows = [
    { 
        id: 1, 
        participant: 'Francisco Patton', 
        title: 'Short Text', 
        article: 'Name of Article', 
        applicationStatus: 'in Review 50%', 
        paymentStatus: 'Request Payment', 
        participation: 'Attended'
    },
    { 
        id: 2, 
        participant: 'Francisco Patton', 
        title: 'Short Text', 
        article: 'Name of Article', 
        applicationStatus: 'Accepted 100%', 
        paymentStatus: 'Paid', 
        participation: 'Absent'
    },
  ];