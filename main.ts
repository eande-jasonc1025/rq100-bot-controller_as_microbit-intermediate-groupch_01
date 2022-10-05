/**
 * RQ-BX: Startup & Setup
 */
/**
 * Startup: Main 'On Start' Stack
 */
/**
 * Setup: Network, Bot-&-Controller-Joystick, Bot-Only, Controller-Joystick-Only
 */
/**
 * RQ-BX: Controller-Joystick (Network: Client)
 */
/**
 * Setup: Serial-Monitor
 */
/**
 * RQ-BX: Bot (Network: Server)
 */
/**
 * Network: 'network_GroupChannel_MyBotAndController_Base0_Int'
 */
/**
 * 'deviceType_Bot_Bool' vs. 'deviceType_Controller_Bool'
 */
/**
 * RQ-BX: Common Functions to be Shared with Both 1) Controller-Joystick (Network: Client) and 2) Bot (Network: Server)
 */
/**
 * RQ-BX-G (Global)
 */
/**
 * RQ-BX: Advance Components: Ultrasonic Sensor
 */
/**
 * Notes
 */
/**
 * * Key Notes: Bot (Network: Server)
 * 
 * * DfRobot Driver Expansion Board
 * 
 * ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
 * 
 * ** https://github.com/DFRobot/pxt-motor
 * 
 * * Micro-Servo 9G A0090 (Sparkfun)
 * 
 * ** ~ HiTec HS-55
 * 
 * ** MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
 * 
 * * To prevent flooding this bot-server with messages, have controller-client delay approx. 20ms to still maintain real-time response after each send-tx.
 * 
 * * Also, 1 Char Msg Max, 2 Char or more caused buffer-overrun and serial broke down, froze
 * 
 * * on event AB not work, but A or B does work reliably
 * 
 * * also 'on button A', 'on button B', and 'on button A+B' do work without 'on event' blocks present: event triggers only on ButtonEvtUp reliably
 * 
 * ** Also if held down longer than 2 sec, event will be aborted
 * 
 * * Thus, avoid condition: 'button A/B/A+B is pressed' block since not reliable
 */
/**
 * * General Notes
 * 
 * * 2019-0519-0340
 * 
 * ** DFRobot Driver Expansion Board
 * 
 * * 2019-0525-09-HAA TYJ first complete joystick XY
 * 
 * * Technical Notes
 * 
 * * 2019-1019
 * 
 * ** Create more responsiveness, no DeadZone
 * 
 * * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
 * 
 * ** Delete 'index_y2' (tried to reuse but '844' error)
 * 
 * ** Tried to reuse 'item' but probably is a system var
 * 
 * ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
 * 
 * ** Rename used-only-once-via-set:
 * 
 * *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
 * 
 * *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
 * 
 * *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
 * 
 *  
 * 
 * * 2020-0120-02: Arm Servo
 * 
 * ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
 * 
 * ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
 * 
 * *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
 * 
 * *** ServoArmRight: P12 (Write-Only)
 * 
 * *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
 * 
 * * 2020-0224-1215
 * 
 * ** Network Test w/ Gaming Server 
 * 
 * *** w/ Sonar: Simulated or Real 
 * 
 * *** w/ BotId: Random or Real
 * 
 * * 2020-0305
 * 
 * ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
 * 
 * *** Delete obsolete 'joystick_Value'
 * 
 * * 2020-0328
 * 
 * ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
 * 
 * ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
 * 
 * * 2020-04xx
 * 
 * Micro-Servo 9G A0090 (Sparkfun)
 * 
 * ~ HiTec HS-55
 * 
 * MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
 * 
 * 0 no
 * 
 * 250 0
 * 
 * 500 no
 * 
 * >> 750: 45
 * 
 * 1000 90 - 10 = 80
 * 
 * 1250 90 + 10 = 100
 * 
 * >> 1500 90 + 30
 * 
 * 1750 180 - 30
 * 
 * 2000 170
 * 
 * 2250 190
 * 
 * >> 2500 225 = 180 + 30/45
 * 
 * 2750 no
 * 
 * 3000 no
 * 
 * * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
 */
/**
 * * Key Notes: Controller-Joystick (Network-Client)
 * 
 * * Yahboom Joystick
 * 
 * ** https://www.yahboom.net/study/SGH
 * 
 * ** https://github.com/lzty634158/GHBit
 * 
 * * DfRobot Driver Expansion Board
 * 
 * ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
 * 
 * ** https://github.com/DFRobot/pxt-motor
 */
function setup_Network_Fn () {
    if (true) {
        _codeComment_AsText = "Network"
        if (true) {
            _codeComment_AsText = "Use Digital-Pin as a DIP Switch for Setup"
            _codeComment_AsText = "Use P16 since easiest to locate (at top) for quick change"
            _codeComment_AsText = "For Controller-Remote: Yahboom: Appears P16 defaults to Low when Open-Circuit"
            _codeComment_AsText = "Remove P16-Dependency since unreliable open-circuit value: either 0 or 1"
            if (true) {
                network_Mode_RadioWireless_Bool = true
                network_Mode_UsbSerialCable_Bool = false
            }
            if (true) {
                network_Throttle_MilliSec_Per_CpuCycle_Start = 0
                network_Throttle_MilliSecPerCpuCycle_End = 0
                network_Throttle_MilliSecPerCpuCycle_Duration = 0
                network_Throttle_Controller_DelayPerCpuCycle_Int = 0
            }
        }
        if (true) {
            _codeComment_AsText = "Constant Channel # for Master Server, which Receives Everyone's Score"
            network_GroupChannel_ScoreboardServer_BASE0_INT = 1
        }
        if (true) {
            network_GroupChannel_MyBotAndController_Edit_Mode_Bool = false
            radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
            basic.showString("CH:" + network_GroupChannel_MyBotAndController_Base0_Int)
        }
    }
}
function config_BotOnly_Setup_Fn () {
    if (deviceType_Bot_Bool) {
        motor_Power_Gear_01_MAX = 75
        motor_Power_Gear_02_MAX = 100
        motor_Power_ZERO_INT = 0
    }
    if (true) {
        motor_Power_Full_Current_Pos = motor_Power_Gear_01_MAX
        motor_Power_Full_Current_Neg = -1 * motor_Power_Full_Current_Pos
        motor_Power_Half_Current = Math.round(0.5 * motor_Power_Full_Current_Pos)
    }
}
function screen_IconMesssage_Fn (screen_IconMessage_Id_Str_In: string) {
    if (screen_IconMessage_Id_Str_In == "bot") {
        _codeComment_AsText = "B = Bot"
        if (true) {
            led.plotBrightness(1, 0, screenBrightness_LO_INT)
            led.plotBrightness(1, 1, screenBrightness_LO_INT)
            led.plotBrightness(1, 2, screenBrightness_LO_INT)
            led.plotBrightness(1, 3, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 3, screenBrightness_LO_INT)
            led.plotBrightness(3, 3, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 1, screenBrightness_LO_INT)
            led.plotBrightness(3, 1, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(3, 2, screenBrightness_LO_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "controller") {
        _codeComment_AsText = "C = Controller"
        if (true) {
            led.plotBrightness(1, 1, screenBrightness_LO_INT)
            led.plotBrightness(1, 2, screenBrightness_LO_INT)
            led.plotBrightness(1, 3, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 3, screenBrightness_LO_INT)
            led.plotBrightness(3, 3, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 1, screenBrightness_LO_INT)
            led.plotBrightness(3, 1, screenBrightness_LO_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "error") {
        _codeComment_AsText = "All 4 Corners Lit: Simple to Code"
        if (true) {
            led.plotBrightness(0, 0, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(4, 0, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(0, 4, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(4, 4, screenBrightness_HI_DEFAULT_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "1") {
        if (true) {
            led.plotBrightness(0, 1, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(0, 2, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(0, 3, screenBrightness_HI_DEFAULT_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "2") {
        if (true) {
            led.plotBrightness(4, 1, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(4, 2, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(4, 3, screenBrightness_HI_DEFAULT_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "d") {
        if (true) {
            led.plotBrightness(1, 0, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(2, 0, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(3, 0, screenBrightness_HI_DEFAULT_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "u") {
        if (true) {
            led.plotBrightness(1, 4, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(2, 4, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(3, 4, screenBrightness_HI_DEFAULT_INT)
        }
    } else {
        serial.writeLine("*** *** ERROR: Invalid Parameter Value: " + screen_IconMessage_Id_Str_In)
    }
}
// * Techncial Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// ** Create more responsiven** Then switch to 'JavaScript' then do
// 
// *** 'let variable = 0'
// 
// *** 'variable = non-zero'
// 
// * MicroBit A/B Buttons not work well with LED Display, so use 'show string' instead
// 
// * Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
// 
// * 2019-1019
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// 
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
input.onButtonPressed(Button.A, function () {
	
})
// * General Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// * Technical Notes
// 
// * 2019-1019
// 
// ** Create more responsiveness, no DeadZone
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// 
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
// 
// * 2020-04xx
// 
// Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
function setup_BotAndController_Fn () {
    if (true) {
        _codeComment_AsText = "Default: None, since require manual activation since all-in-one code shared between both devices"
        deviceType_Controller_Bool = false
        deviceType_Bot_Bool = false
    }
    if (true) {
        screenBrightness_HI_DEFAULT_INT = 255
        _codeComment_AsText = "127 not low enough, 15 is better, 1 too low, 7 seems best"
        screenBrightness_LO_INT = 7
    }
    if (true) {
        _debug_Serial_Print_Bool = false
    }
}
function setup_ControllerOnly_Fn () {
    if (deviceType_Controller_Bool) {
    	
    }
}
input.onButtonPressed(Button.AB, function () {
    deviceType_Bot_Bool = false
    if (!(deviceType_Controller_Bool)) {
        deviceType_Controller_Bool = true
    }
})
function Screen_Clear_Fn () {
    for (let index_X = 0; index_X <= 4; index_X++) {
        for (let index_Y = 0; index_Y <= 4; index_Y++) {
            led.unplot(index_X, index_Y)
        }
    }
}
// RQ-BX-G (Global)
radio.onReceivedString(function (receivedString) {
    _codeComment_AsText = "For Local-Controller-Remote"
    if (network_Mode_RadioWireless_Bool && deviceType_Bot_Bool) {
        if (true) {
            if (false) {
                serial.writeLine("RadioNetwork:>" + receivedString + "<")
            }
            Screen_Clear_Fn()
            if (true) {
                if (receivedString == "f") {
                    wuKong.setAllMotor(motor_Power_Full_Current_Pos, motor_Power_Full_Current_Pos)
                    roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_Full_Current_Pos, motor_Power_Full_Current_Pos)
                    led.plot(2, 0)
                } else if (receivedString == "b") {
                    wuKong.setAllMotor(motor_Power_Full_Current_Neg, motor_Power_Full_Current_Neg)
                    roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_Full_Current_Neg, motor_Power_Full_Current_Neg)
                    led.plot(2, 4)
                } else if (receivedString == "l") {
                    wuKong.setAllMotor(motor_Power_Full_Current_Neg, motor_Power_Full_Current_Pos)
                    roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_Full_Current_Neg, motor_Power_Full_Current_Pos)
                    led.plot(0, 2)
                } else if (receivedString == "r") {
                    wuKong.setAllMotor(motor_Power_Full_Current_Pos, motor_Power_Full_Current_Neg)
                    roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_Full_Current_Pos, motor_Power_Full_Current_Neg)
                    led.plot(4, 2)
                } else if (receivedString == "8") {
                    led.plot(0, 0)
                } else if (receivedString == "9") {
                    led.plot(4, 0)
                } else if (receivedString == "s") {
                    _codeComment_AsText = "To complement Gear Icons"
                    wuKong.setAllMotor(motor_Power_ZERO_INT, motor_Power_ZERO_INT)
                    roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_ZERO_INT, motor_Power_ZERO_INT)
                    led.plot(2, 2)
                    _codeComment_AsText = "During idle, show entity-type: B=Bot, C=Controller"
                    screen_IconMesssage_Fn("bot")
                } else if (receivedString == "d") {
                    let servoArm_DOWN_DEGREES_INT = 0
                    pins.servoWritePin(AnalogPin.P15, servoArm_DOWN_DEGREES_INT)
                    screen_IconMesssage_Fn("d")
                } else if (receivedString == "u") {
                    let servoArm_UP_DEGREES_INT = 0
                    pins.servoWritePin(AnalogPin.P15, servoArm_UP_DEGREES_INT)
                    screen_IconMesssage_Fn("u")
                } else if (receivedString == "1") {
                    if (true) {
                        motor_Power_Full_Current_Pos = motor_Power_Gear_01_MAX
                        motor_Power_Full_Current_Neg = -1 * motor_Power_Full_Current_Pos
                        motor_Power_Half_Current = Math.round(0.5 * motor_Power_Full_Current_Pos)
                        screen_IconMesssage_Fn("1")
                    }
                } else if (receivedString == "2") {
                    if (true) {
                        motor_Power_Full_Current_Pos = motor_Power_Gear_02_MAX
                        motor_Power_Full_Current_Neg = -1 * motor_Power_Full_Current_Pos
                        motor_Power_Half_Current = Math.round(0.5 * motor_Power_Full_Current_Pos)
                        screen_IconMesssage_Fn("2")
                    }
                } else {
                    _codeComment_AsText = "Error: Unknown Msg"
                    wuKong.setAllMotor(motor_Power_ZERO_INT, motor_Power_ZERO_INT)
                    roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_ZERO_INT, motor_Power_ZERO_INT)
                    if (true) {
                        _codeComment_AsText = "For now, all 4 corners = Error: Unknown Msg"
                        screen_IconMesssage_Fn("error")
                    }
                }
            }
            if (_debug_Serial_Print_Bool) {
                network_Throttle_MilliSecPerCpuCycle_End = control.millis()
                network_Throttle_MilliSecPerCpuCycle_Duration = network_Throttle_MilliSecPerCpuCycle_End - network_Throttle_MilliSec_Per_CpuCycle_Start
                network_Throttle_MilliSec_Per_CpuCycle_Start = network_Throttle_MilliSecPerCpuCycle_End
                serial.writeLine("\"*** *** Debug: network_Throttle_MilliSec_Per_CpuCycle_Duration: \"" + network_Throttle_MilliSecPerCpuCycle_Duration)
            }
        }
    } else if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        _codeComment_AsText = "Only place that activates Bot"
        _codeComment_AsText = "Bot can only be activated by wake-up message from Controller-Remote"
        deviceType_Bot_Bool = true
        config_BotOnly_Setup_Fn()
    }
})
input.onButtonPressed(Button.B, function () {
	
})
let _debug_Serial_Print_Bool = false
let deviceType_Controller_Bool = false
let screenBrightness_HI_DEFAULT_INT = 0
let screenBrightness_LO_INT = 0
let motor_Power_Half_Current = 0
let motor_Power_Full_Current_Neg = 0
let motor_Power_Full_Current_Pos = 0
let motor_Power_ZERO_INT = 0
let motor_Power_Gear_02_MAX = 0
let motor_Power_Gear_01_MAX = 0
let deviceType_Bot_Bool = false
let network_GroupChannel_MyBotAndController_Edit_Mode_Bool = false
let network_GroupChannel_ScoreboardServer_BASE0_INT = 0
let network_Throttle_Controller_DelayPerCpuCycle_Int = 0
let network_Throttle_MilliSecPerCpuCycle_Duration = 0
let network_Throttle_MilliSecPerCpuCycle_End = 0
let network_Throttle_MilliSec_Per_CpuCycle_Start = 0
let network_Mode_UsbSerialCable_Bool = false
let network_Mode_RadioWireless_Bool = false
let network_GroupChannel_MyBotAndController_Base0_Int = 0
let _codeComment_AsText = ""
if (true) {
    _codeComment_AsText = "Set GroupChannel-# for Both Bot & Controller-Remote."
    network_GroupChannel_MyBotAndController_Base0_Int = 1
    setup_Network_Fn()
    setup_BotAndController_Fn()
}
basic.forever(function () {
    if (deviceType_Controller_Bool) {
        Screen_Clear_Fn()
        if (input.isGesture(Gesture.LogoDown)) {
            radio.sendString("f")
            led.plot(2, 0)
        } else if (input.isGesture(Gesture.LogoUp)) {
            radio.sendString("b")
            led.plot(2, 4)
        } else if (input.buttonIsPressed(Button.A)) {
            radio.sendString("l")
            led.plot(0, 2)
        } else if (input.buttonIsPressed(Button.B)) {
            radio.sendString("r")
            led.plot(4, 2)
        } else {
            radio.sendString("s")
            led.plot(2, 2)
            _codeComment_AsText = "During idle, show entity-type: B=Bot, C=Controller"
            screen_IconMesssage_Fn("controller")
        }
        if (false) {
            _codeComment_AsText = "Deactivate to prevent inducing any network lag"
            _codeComment_AsText = "To not flood bot-server, add delay"
            basic.pause(network_Throttle_Controller_DelayPerCpuCycle_Int)
        }
        if (_debug_Serial_Print_Bool) {
            network_Throttle_MilliSecPerCpuCycle_End = control.millis()
            network_Throttle_MilliSecPerCpuCycle_Duration = network_Throttle_MilliSecPerCpuCycle_End - network_Throttle_MilliSec_Per_CpuCycle_Start
            network_Throttle_MilliSec_Per_CpuCycle_Start = network_Throttle_MilliSecPerCpuCycle_End
            serial.writeLine("\"*** *** Debug: network_Throttle_MilliSec_Per_CpuCycle_Duration: \"" + network_Throttle_MilliSecPerCpuCycle_Duration)
        }
    }
})
basic.forever(function () {
    _codeComment_AsText = "DashboardDisplay_GroupChannel_Edit_Mode"
    if (network_GroupChannel_MyBotAndController_Edit_Mode_Bool) {
        basic.clearScreen()
        _codeComment_AsText = "'groupChannel_Mine_Base1_Int' convert from Human-Base1 to XY-Base0"
        for (let index = 0; index <= network_GroupChannel_MyBotAndController_Base0_Int - 1; index++) {
            led.plot(index % 5, Math.idiv(index, 5))
        }
    }
})
basic.forever(function () {
    _codeComment_AsText = "Fragment the letters to be interruptible between each 'show string' block"
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("P")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("u")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("s")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("h")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("A+B")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("But-")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("tons")
    }
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        basic.showString("")
    }
})
basic.forever(function () {
    _codeComment_AsText = "Debug: Monitor Variables"
    _codeComment_AsText = "Debug: Deactivate to reduce CPU load"
    if (false) {
        serial.writeLine("networkMode_RadioWireless_Bool:" + network_Mode_RadioWireless_Bool)
        serial.writeLine("networkMode_UsbSerialCable_Bool:" + network_Mode_UsbSerialCable_Bool)
        serial.writeLine("deviceType_Bot_Bool:" + deviceType_Bot_Bool)
        serial.writeLine("deviceType_Controller_Bool:" + deviceType_Controller_Bool)
        serial.writeLine("p16:" + pins.digitalReadPin(DigitalPin.P16))
        basic.pause(3000)
    }
})
basic.forever(function () {
	
})
