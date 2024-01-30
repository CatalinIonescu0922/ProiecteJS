#include <iostream>
#include <fstream>
using namespace std;
int v[100],n,i;
ifstream f("date.in");
ofstream
g("date.out"); void inter(int &x,int &y)
{int_aux=x;x=y;y=aux;}
void sort(int a[100],int n)
{int i,gata;
do{gata=1;
for(i=1; i<n;i++)
if(a[i]<a[i+1];
{inter(a[i], a[i+1]);
gata=0;}}
while (!gata);}
int main() {
f>>n;
for(i=1;i<=n; i++) {
g<<v[i]<<" ";
}
f.close();
g.close();
return 0;
}