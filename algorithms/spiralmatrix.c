#include<stdio.h>
#define MAX 100
void vibecheck(int arr[MAX][MAX], int m, int n, int k)
{
	int x = 0, y = 0, ctr = 0;
	int i = 0;
	while (x < m && y < n) 
	{
		for (i = y; i < n; i++) 
		{
			ctr++;

			if (ctr == k)
				printf("%d ", arr[x][i]);
		}
		x++;

		for (i = x; i < m; ++i) {
			ctr++;

			if (ctr == k)
				printf("%d ", arr[i][n - 1]);
		}
		n--;

		if (x < m) {
			for (i = n - 1; i >= y; --i) {
				ctr++;

				if (ctr == k)
					printf("%d ", arr[m - 1][i]);
			}
			m--;
		}

		if (y < n) {
			for (i = m - 1; i >= x; --i) {
				ctr++;

				if (ctr == k)
					printf("%d ", arr[i][y]);
			}
			y++;
		}
	
	}
}
void main()
{
	int arr[MAX][MAX], m = 0, n = 0, k = 0;
	printf("Enter the number of rows and columns space separated:");
	scanf_s("%d %d", &m, &n);
	printf("\nEnter the elements of the of the matrix (2D)(%dx%d):", m, n);
	for (int i = 0; i < m; i++)
	{
		for (int j = 0; j < n; j++)
		{
			scanf_s("%d", &arr[i][j]);
		}
	}
	printf("\nEnter the position value:");
	scanf_s("%d", &k);
	vibecheck(arr, m, n, k);
}