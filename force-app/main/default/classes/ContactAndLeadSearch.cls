public class ContactAndLeadSearch
{
    public static List<List<SObject>> searchContactsAndLeads(String searchText)
    {
	List<List<sObject>> searchList = [FIND :searchText IN ALL FIELDS
                   						RETURNING
                                      Contact(LastName),
                                      Lead(LastName)];
	Contact[] searchContacts = (Contact[])searchList[0];
	Lead[] searchLeads = (Lead[])searchList[1];
	System.debug('Found the following contacts.');
	for (Contact c : searchContacts)
    {
    	System.debug(c.LastName);
	}
	System.debug('Found the following Leads.');
	for (Lead l : searchLeads)
    {
    	System.debug(l.LastName);
	}
        return searchList;
	}
}