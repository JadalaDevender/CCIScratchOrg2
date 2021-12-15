public class StringArrayTest {
    public static String[] generateStringArray(Integer n)
    {
        String[] var=new String[]{};
        for(Integer i=0;i<n;i++)
        {
            var.add('Test '+i);
        }
         return var;
    }

}