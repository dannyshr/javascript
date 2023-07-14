Option Explicit

'declare globals
dim networkObj,wmiService,fso
dim messagesTitle

'initialize globals
messagesTitle = "Telemetry"

autoFetchNetworkPM()

function autoFetchNetworkPM()
	'declare locals
	dim counter, min, maxTimes, sleepTime, domainName, filePath, strData
	
	'initialize values
	counter = 0
	min = 1
	maxTimes = 2
	sleepTime = 2000
	domainName = "shraga_home"
	filePath = "pcperf.js"
	
	'loop through
	for counter = min to maxTimes
		'get the data
		strData = fetchNetworkPM(getNetworkComputers(domainName))
		
		'save the data
		writeDataToFile filePath,strData
		
		'sleep for a while
		wscript.sleep sleepTime
	next
	
	'clear objects
	cleanObjects()
end function

function writeDataToFile(filePath, data)
	'declare locals
	dim objFSO, objOutFile
	
	'check for nulls
	if (IsNull(filePath) or IsNull(data)) then 
		'msgbox "writeDataToFile(): filePath or data are null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize values
	set objFSO = getFsoObject()
	set objOutFile = objFSO.OpenTextFile(filePath, 2, true)
	
	'write the data to the file		
	objOutFile.WriteLine data
	
	'clear objects
	set objFSO = nothing
end function

function getNetworkObject()
	'check for nulls
	if (IsNull(networkObj)) then 
		set getNetworkObject = networkObj
		exit function
	end if
	
	'create the object
	set networkObj = CreateObject("Wscript.Network")
	
	'return the method value
	set getNetworkObject = networkObj
end function

function getWmiService(computerName)
	'check for nulls
	if (IsNull(computerName)) then 
		'msgbox "getWmiService(): computerName is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'handle errors
	on error resume next
	
	'check for nulls
	if (IsNull(wmiService)) then 
		set getWmiService = wmiService
		exit function
	end if
	
	'create the object
	'set wmiService = GetObject("winmgmts://" & computerName)
	set wmiService = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\" & computerName & "\root\cimv2")
	
	'return the method value
	set getWmiService = wmiService
end function

function getFsoObject()
	'check for nulls
	if (IsNull(fso)) then 
		set getFsoObject = fso
		exit function
	end if
	
	'create the object
	set fso = CreateObject("Scripting.FileSystemObject") 
	
	'return the method value
	set getFsoObject = fso
end function

function cleanObjects()
	'clean globals
	set fso = nothing
	set wmiService = nothing
	set networkObj = nothing
end function

function getNetworkComputers(domainName)
	'declare locals
	dim oDomain, oObject, sComputerName, delimiter, counter, sDomainComps
	
	'check for nulls
	if (IsNull(domainName)) then 
		'msgbox "getNetworkComputers(): domainName is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize objects
	counter = 0
	delimiter = ","
	sDomainComps = ""
	set oDomain = GetObject("WinNT://" & domainName)
	
	'loop through the objects in the domain
	for each oObject in oDomain
		'is this object a computer
	 	if (oObject.Class = "Computer") then
	 		'yes - do something with it
	 		sComputerName = oObject.Name
	 		
			'add a delimiter if necessary
	 		if (counter > 0) then
	 			sDomainComps = sDomainComps & delimiter
	 		end if
	 		sDomainComps = sDomainComps & sComputerName
	 		
			'increase a counter
			counter = counter+1
		end if
	next
	
	'return the method value
	getNetworkComputers = sDomainComps
end function

function getDiskUsage(computerName)
	'declare locals
	dim objWMIService, colItems, objItem, delimiter, counter, strUsageLine, strUsage, GB, totalSize, freeSpace
	
	'check for nulls
	if (IsNull(computerName)) then 
		'msgbox "getDiskUsage(): computerName is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize values
	delimiter = ","
	counter = 0
	strUsageLine = ""
	strUsage = ""
	GB = (1024 * 1024 * 1024)
	totalSize = 0
	freeSpace = 0
	set objWMIService = getWmiService(computerName)
	
	'fetch a data collection
	set colItems = objWMIService.InstancesOf("Win32_LogicalDisk")
	
	'loop through the data
	for each objItem in colItems
		'check for a hard-disk drive type
		if objItem.drivetype=3 then
			'I had to add a check here to see if the value is a number because if the computer has a new partition that hasn't been formatted yet, this value is null, which causes the script to throw an error
			if (IsNumeric(objItem.size)) then
				'check if a delimiter is needed
				if (counter > 0) then
					strUsage = strUsage & vbcrlf & delimiter
				end if
				
				'build the usage string
				totalSize = Round(objItem.size/GB,0)
				freeSpace = Round(objItem.freespace/GB,0)
				strUsageLine = "{" & _ 
							"diskLetter:""" & objItem.DeviceID & """" & _ 
							",diskSizeTotalGB:""" & totalSize & """" & _ 
							",diskSizeFreeGB:""" & freeSpace & """" & _ 
							",diskSizeFreePercent:""" & Round((freeSpace*100)/totalSize,2) & """" & _ 
							"}"
				strUsage = strUsage & strUsageLine
				
				'increase a counter
				counter = counter+1
			end if
		end if	
	next
	
	'return the method value
	getDiskUsage = strUsage
end function

function getCpuUsage(computerName)
	'declare locals
	dim objWMIService, colItems, objItem, strUsage
	
	'check for nulls
	if (IsNull(computerName)) then 
		'msgbox "getCpuUsage(): computerName is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize values
	strUsage = ""
	set objWMIService = getWmiService(computerName)
	
	'fetch a data collection
	set colItems = objWMIService.ExecQuery("SELECT * FROM Win32_PerfFormattedData_PerfOS_Processor WHERE Name = '_Total'") 
	
	'loop through the data
	for each objItem in colItems 
		strUsage = CStr(objItem.PercentProcessorTime) 
	next
	
	'return the method value
	getCpuUsage = strUsage
end function

function getTotalMemory(computerName)
	'declare locals
	dim objWMIService, colItems, objItem, totalRam, strTotal, MB
	
	'check for nulls
	if (IsNull(computerName)) then 
		'msgbox "getTotalMemory(): computerName is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize values
	strTotal = ""
	totalRam = 0
	MB =(1024 *1024)
	set objWMIService = getWmiService(computerName)
	
	'fetch a data collection
	set colItems = objWMIService.ExecQuery ("Select * from Win32_ComputerSystem") 
 	
	'loop through the data
	for each objItem in colItems 
		totalRam = totalRam + Round(objItem.TotalPhysicalMemory / MB,2)
	next 
	
	'return the method value
	strTotal = CStr(totalRam)
	getTotalMemory = strTotal
end function

function getMemoryUsage(computerName)
	'declare locals
	dim objWMIService, colItems, objItem, ramUsage, strUsage, MB
	
	'check for nulls
	if (IsNull(computerName)) then 
		'msgbox "getMemoryUsage(): computerName is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize values
	strUsage = ""
	ramUsage = 0
	MB = (1024 *1024)
	set objWMIService = getWmiService(computerName)
	
	'fetch a data collection
	set colItems = objWMIService.ExecQuery("Select * from Win32_PerfFormattedData_PerfOS_Memory",,48)
 	
	'loop through the data
	for each objItem in colItems
		ramUsage = ramUsage + Round(objItem.AvailableBytes / MB,2)
	next
	
	'return the method value
	strUsage = CStr(ramUsage)
	getMemoryUsage = strUsage
end function

function fetchNetworkPM(networkComputers)
	'declare locals
	dim delimiter, arrComputers, computer, strLine, strResponse, counter
	
	'check for nulls
	if (IsNull(networkComputers)) then 
		'msgbox "fetchNetworkPM(): networkComputers is null!!", vbOKOnly+vbWarning, messagesTitle
		exit function
	end if
	
	'initialize values
	delimiter = ","
	strResponse = ""
	counter = 0
	
	'split the network computers
	arrComputers = split(networkComputers,delimiter)
	
	'render the start of the response
	strResponse = "var _pcperfdata = ["
	
	'loop through the items
	for each computer in arrComputers
		'reset value
		strLine = ""
		
		'check if a delimiter is needed
		if (counter > 0) then
			strResponse = strResponse & vbcrlf & delimiter
		end if
		
		'render the data line
		strLine = "{" & _ 
					"computerName:""" & computer & """" & _ 
					",cpu:""" & getCpuUsage(computer) & """" & _ 
					",totalMemory:""" & getTotalMemory(computer) & """" & _ 
					",memoryUsage:""" & getMemoryUsage(computer) & """" & _ 
					",diskUsage:[" & getDiskUsage(computer) & "]" & _ 
					"}"
		strResponse = strResponse & strLine
		
		'increase a counter
		counter = counter+1
	next
	
	'render the start of the response
	strResponse = strResponse & vbcrlf & "];"
	
	'return the mmethod value
	fetchNetworkPM = strResponse
end function
